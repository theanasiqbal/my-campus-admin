'use client'

import { useActionState } from 'react'
import Image from 'next/image'
import { login } from './actions'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { AlertCircle, Loader2 } from 'lucide-react'

const initialState = {
    error: null as string | null,
}

export default function LoginPage() {
    const [state, formAction, isPending] = useActionState(login, initialState)

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
                <Image src="/small-icon.png" alt="My Campus" width={48} height={48} className="mb-6 rounded-xl shadow-sm" />
                <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-center text-sm text-slate-600">
                    Admin portal access
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <Card className="border-slate-200 shadow-xl shadow-slate-200/50">
                    <CardHeader className="pb-4">
                        <CardTitle>Welcome back</CardTitle>
                        <CardDescription>Enter your email below to login.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form action={formAction} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email address</Label>
                                <div className="mt-1">
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        placeholder="admin@mycampus.com"
                                        className="w-full"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <div className="mt-1">
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        placeholder="••••••••"
                                        className="w-full"
                                    />
                                </div>
                            </div>

                            {state?.error && (
                                <div className="rounded-md bg-red-50 p-3 flex items-start gap-3 border border-red-200">
                                    <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                                    <p className="text-sm font-medium text-red-800">
                                        {state.error}
                                    </p>
                                </div>
                            )}

                            <div>
                                <Button type="submit" className="w-full" disabled={isPending}>
                                    {isPending ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Signing in...
                                        </>
                                    ) : (
                                        'Sign in'
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
