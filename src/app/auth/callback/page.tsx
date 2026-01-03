"use client"

import { AuthFacade } from "@/app/facades/auth.facade"
import { Spinner } from "@/components/ui/loading"
import { useAppSelector } from "@/hooks/useRedux"
import { RootState } from "@/store"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

const OAuthCallback = () => {
    const params = useSearchParams()
    const accessToken = params.get("accessToken")
    const refreshToken = params.get("refreshToken")
    const {loading, error} = useAppSelector((state: RootState) => state.auth)
    
    useEffect(() => {
        if (accessToken && refreshToken) {
            AuthFacade.oauth(accessToken, refreshToken)
        }
    },[accessToken, refreshToken])

    if (loading) return <Spinner/>
    if (error) return <span>{error}</span>
}

export default OAuthCallback