// import React, { useEffect, useState, useContext } from "react"
// import { GetUserQuery, User } from "../graphql/generated/graphql"
// import { useLazyQuery } from "@apollo/client"
// import { GET_USER } from "../graphql/user.graphql"
// import { useSessionContext } from "./session.context"

// interface CurrentUserContextType {
//   firebaseId: string | undefined
//   user: User | null
// }

// const context = React.createContext<CurrentUserContextType | null>(null)

// export function UserProvider(props: { children: any }) {
//   const [currentUser, setCurrentUser] = useState<CurrentUserContextType>({
//     firebaseId: undefined,
//     user: null,
//   })
//   const { token, userId } = useSessionContext()
//   const [fetchUser] = useLazyQuery<GetUserQuery>(GET_USER)

//   useEffect(() => {
//     const getUser = async () => {
//       try {
//         const response = await fetchUser({ variables: { firebaseUid: userId } })
//         if (response.data?.getUser) {
//           setCurrentUser({ ...currentUser, user: response.data.getUser })
//         }
//       } catch (error) {
//         setCurrentUser({ firebaseId: undefined, user: null })
//       }
//     }

//     if (userId) {
//       if (userId !== currentUser.firebaseId) {
//         getUser().then().catch()
//       }
//     } else {
//       setCurrentUser({ firebaseId: undefined, user: null })
//     }
//   }, [userId])

//   return (
//     <context.Provider value={currentUser}>{props.children}</context.Provider>
//   )
// }

// export const useUserContext = () => useContext(context)
