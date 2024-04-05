import { ApiService } from "../ApiService";

const authEndpoint = ApiService.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (arg) => ({
        url: "/login",
        method: "POST",
        body: arg,
      }),
      invalidatesTags: ["auth"],
    }),
    signUp: builder.mutation({
      query: (arg) => ({
        url: "/register",
        method: "POST",
        body: arg,
      }),
      invalidatesTags: ["auth"],
    }),

    profile: builder.query({
      query: () => "user-profile",
      providesTags: ["auth"],

      //Api service mr=header lo dl
    }),
    logout: builder.mutation({
      query: () => ({
        url: "user-logout",
        method: "POST",
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});
export const {
  useSignInMutation,
  useSignUpMutation,
  useProfileQuery,
  useLogoutMutation,
} = authEndpoint;
