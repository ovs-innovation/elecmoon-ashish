import { useContext, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useCart } from "react-use-cart";
import { WishlistContext } from "@context/WishlistContext";
import CustomerServices from "@services/CustomerServices";

/**
 * SessionSync - This component sits inside CartProvider + WishlistProvider.
 * It listens for login/logout events and saves/restores user-specific
 * cart and wishlist data from Database.
 */
const SessionSync = () => {
    const { data: session, status } = useSession();
    const { items, setItems, emptyCart } = useCart();
    const { wishlistItems, loadWishlist, clearWishlist } = useContext(WishlistContext);

    const prevStatus = useRef(status);
    const prevUserId = useRef(null);
    const [isRestoring, setIsRestoring] = useState(false);
    const [isRestored, setIsRestored] = useState(false);

    const itemsRef = useRef(items);
    useEffect(() => { itemsRef.current = items; }, [items]);
    const wishRef = useRef(wishlistItems);
    useEffect(() => { wishRef.current = wishlistItems; }, [wishlistItems]);

    // Handles Restoration on Login
    useEffect(() => {
        if (status === "authenticated" && session?.user?.id) {
            const userId = session.user.id;

            // Trigger restoration only on login or user switch
            if (prevStatus.current !== "authenticated" || !isRestored || prevUserId.current !== userId) {
                prevUserId.current = userId;

                const startRestoration = async () => {
                    setIsRestoring(true);

                    try {
                        // ALWAYS fetch fresh data from API (DB is source of truth)
                        // Session token cart is stale (set at login time only)
                        let dbCart = [];
                        let dbWishlist = [];

                        try {
                            const [cartRes, wishRes] = await Promise.all([
                                CustomerServices.getCart(userId),
                                CustomerServices.getWishlist(userId)
                            ]);
                            dbCart = cartRes?.cart || [];
                            dbWishlist = wishRes?.wishlist || [];
                        } catch (err) {
                            // If API fails, fall back to session data
                            console.error("Error fetching cart/wishlist from API, using session data:", err);
                            dbCart = session.user.cart || [];
                            dbWishlist = session.user.wishlist || [];
                        }

                        // Merge: DB cart is source of truth, append unique guest items
                        const mergedCart = [...dbCart];
                        itemsRef.current.forEach(guestItem => {
                            const exists = dbCart.some(dbItem =>
                                (dbItem.id || dbItem._id) === (guestItem.id || guestItem._id)
                            );
                            if (!exists) mergedCart.push(guestItem);
                        });

                        // Merge: DB wishlist is source of truth, append unique guest items
                        const mergedWish = [...dbWishlist];
                        wishRef.current.forEach(guestItem => {
                            const exists = dbWishlist.some(dbItem =>
                                (dbItem._id || dbItem.id) === (guestItem._id || guestItem.id)
                            );
                            if (!exists) mergedWish.push(guestItem);
                        });

                        // Always apply final state (even if empty - clears stale guest data)
                        setItems(mergedCart);
                        loadWishlist(mergedWish);

                    } catch (e) {
                        console.error("SessionSync restoration error:", e);
                    } finally {
                        setIsRestoring(false);
                        setIsRestored(true);
                    }
                };

                startRestoration();
            }
        } else if (status === "unauthenticated" && prevStatus.current === "authenticated") {
            // User logged out
            setIsRestored(false);
            setIsRestoring(false);

            // IMMEDIATE SYNC BEFORE CLEARING (Fixes rapid testing Add -> Logout issue)
            const userId = prevUserId.current;
            if (userId && itemsRef.current) {
                // Fire and forget the exact state right before clearing
                Promise.all([
                    CustomerServices.saveCart(userId, { cart: itemsRef.current }),
                    CustomerServices.saveWishlist(userId, { wishlist: wishRef.current })
                ]).catch(e => console.error("Final sync error on logout:", e));
            }

            prevUserId.current = null;
            emptyCart();
            if (typeof clearWishlist === 'function') clearWishlist();
        }

        prevStatus.current = status;
    }, [status, session?.user?.id]);

    // Sync Cart/Wishlist changes to DB (debounced, only after restoration is done)
    useEffect(() => {
        if (status !== "authenticated" || isRestoring || !isRestored || !session?.user?.id) return;

        const userId = session.user.id;

        const syncData = async () => {
            try {
                await Promise.all([
                    CustomerServices.saveCart(userId, { cart: items }),
                    CustomerServices.saveWishlist(userId, { wishlist: wishlistItems })
                ]);
            } catch (error) {
                console.error("Failed to sync cart/wishlist to DB:", error);
            }
        };

        // 2 second debounce to avoid excessive API calls on rapid changes
        const timeout = setTimeout(syncData, 2000);
        return () => clearTimeout(timeout);
    }, [items, wishlistItems, status, isRestored, isRestoring, session?.user?.id]);

    return null;
};

export default SessionSync;
