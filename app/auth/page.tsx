"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { jwtDecode } from 'jwt-decode'
// import { loginUser } from "@/lib/login";
import { LoaderCircle } from "lucide-react";
import { useAuth } from "@/context/authcontext";
import { authApi } from "@/lib/login";
import { AuthResponse } from "../../lib/login";



const loginSchema = z.object({
    username: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
})
type LoginFormData = z.infer<typeof loginSchema>;

const registerSchema = loginSchema.extend({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    userType: z.enum(["Restaurant Service Provide", "Laundry Service Provider"], { required_error: "Please select a user role" }),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})

export default function AuthPage() {
    const [activeTab, setActiveTab] = useState("login")
    const { user, setUser } = useAuth()
    const router = useRouter();


    const loginForm = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: { username: "", password: "" },
    })

    const registerForm = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: { name: "", email: "", password: "", confirmPassword: "", userType: undefined },
    })


    const { mutate, isPending, data }: UseMutationResult<AuthResponse, Error, LoginFormData> = useMutation({
        mutationFn: (loginData: LoginFormData) => authApi.login(loginData),
        onSuccess: async () => {
            if (data?.access_token) {
                setUser(jwtDecode(data?.access_token))
                router.replace('/dashboard')


            }
        },
        onError: (error: Error) => console.log(error.message)
    })


    console.log(data, 'DATA =====================================')
    console.log(data?.access_token, 'DECODED ===========================')
    console.log(user)

    return (
        <div className="grid md:grid-cols-2  grid-cols-1 relative">
            <div className="fixed inset-0 bg-opacity-50 bg-black -z-10">
                <svg className="absolute  inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                            <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.1)" />
                        </pattern>
                    </defs>
                    <rect x="0" y="0" width="100%" height="100%" fill="url(#dots)" />
                </svg>
            </div>
            <div className="flex-1 hidden lg:flex items-center justify-center p-12">
                <div className="max-w-xl text-white text-clip">
                    <h1 className="text-7xl font-bold mb-6">Your One-Stop Solution</h1>
                    <p className="text-2xl mb-8">
                        Food ordering, laundry service, item delivery, and P2P marketplace - all in one app!
                    </p>
                </div>
            </div>
            <div className="flex-1 max-h-full flex p-8">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center">Welcome</CardTitle>
                        <CardDescription className="text-center">Login or create an account</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="login">Login</TabsTrigger>
                                <TabsTrigger value="register">Register</TabsTrigger>
                            </TabsList>
                            <TabsContent value="login">
                                <form onSubmit={loginForm.handleSubmit((data) => mutate(data))}>
                                    <div className="grid w-full items-center gap-4">
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="login-email">Email</Label>
                                            <Input
                                                id="login-email"
                                                placeholder="Enter your email"
                                                type="email"
                                                {...loginForm.register("username")}
                                            />
                                            {loginForm.formState.errors.username && (
                                                <p className="text-sm text-red-500">{loginForm.formState.errors.username.message}</p>
                                            )}
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="login-password">Password</Label>
                                            <Input
                                                id="login-password"
                                                placeholder="Enter your password"
                                                type="password"
                                                {...loginForm.register("password")}
                                            />
                                            {loginForm.formState.errors.password && (
                                                <p className="text-sm text-red-500">{loginForm.formState.errors.password.message}</p>
                                            )}
                                        </div>
                                    </div>
                                    <Button disabled={isPending} type="submit" className="w-full mt-4  text-white bg-orange-600 text-md uppercase font-semibold hover:bg-orange-500">
                                        {isPending ? <LoaderCircle size={20} /> : 'Login'}
                                    </Button>
                                </form>
                            </TabsContent>
                            <TabsContent value="register">
                                <form onSubmit={registerForm.handleSubmit((data) => console.log(data))}>
                                    <div className="grid w-full items-center gap-4">
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="register-name">Username</Label>
                                            <Input
                                                id="register-name"
                                                placeholder="Enter your name"
                                                {...registerForm.register("name")}
                                            />
                                            {registerForm.formState.errors.name && (
                                                <p className="text-sm text-red-500">{registerForm.formState.errors.name.message}</p>
                                            )}
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="register-email">Email</Label>
                                            <Input
                                                id="register-email"
                                                placeholder="Enter your email"
                                                type="email"
                                                {...registerForm.register("email")}
                                            />
                                            {registerForm.formState.errors.email && (
                                                <p className="text-sm text-red-500">{registerForm.formState.errors.email.message}</p>
                                            )}
                                        </div>
                                        {/* <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="register-user-type">Role</Label>
                                            <Select onValueChange={(value: string) => registerForm.setValue("userType", value)}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Role" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="customer">Restaurant Service Provide</SelectItem>
                                                    <SelectItem value="vendor">Laundry Service Provider</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {registerForm.formState.errors.userType && (
                                                <p className="text-sm text-red-500">{registerForm.formState.errors.userType.message}</p>
                                            )}
                                        </div> */}
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="register-password">Password</Label>
                                            <Input
                                                id="register-password"
                                                placeholder="Choose a password"
                                                type="password"
                                                {...registerForm.register("password")}
                                            />
                                            {registerForm.formState.errors.password && (
                                                <p className="text-sm text-red-500">{registerForm.formState.errors.password.message}</p>
                                            )}
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="register-confirm-password">Confirm Password</Label>
                                            <Input
                                                id="register-confirm-password"
                                                placeholder="Confirm your password"
                                                type="password"
                                                {...registerForm.register("confirmPassword")}
                                            />
                                            {registerForm.formState.errors.confirmPassword && (
                                                <p className="text-sm text-red-500">{registerForm.formState.errors.confirmPassword.message}</p>
                                            )}
                                        </div>
                                    </div>
                                    <Button type="submit" className="w-full mt-4 text-white bg-orange-600 text-md uppercase font-semibold hover:bg-orange-500">
                                        Register
                                    </Button>
                                </form>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}