import { InMemoryCache, Reference, makeVar } from "@apollo/client";

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            return isLoggedInVar();
          },
        },
        cartItems: {
          read() {
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            return cartItemsVar();
          },
        },
        launches: {
          keyArgs: false,
          merge(existing, incoming) {
            let launches: Reference[] = [];
            if (existing && existing.launches) {
              launches = launches.concat(existing.launches);
            }
            if (incoming && incoming.launches) {
              launches = launches.concat(incoming.launches);
            }
            return {
              ...incoming,
              launches,
            };
          },
        },
      },
    },
  },
});

export const isLoggedInVar = makeVar<boolean>(!!localStorage.getItem("token"));
export const cartItemsVar = makeVar<string[]>([]);
