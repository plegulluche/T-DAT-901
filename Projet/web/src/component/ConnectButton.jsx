import { useUserContext } from "./UserContext"

export default function ConnectButton({}) {
    const {getUser} = useUserContext()
    if (getUser() === 'anonymous') {
        return (
            <div className='hover:cursor-pointer absolute z-50 w-[130px] h-[40px] bg-orange-300 top-10 right-10 rounded-lg flex items-center justify-center'
            onClick={() => window.location='/auth/signin'}>
                <p className="text-white">Se connecter</p>
            </div>
        )
    }
    else return <div></div>
}