"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Upload, Loader2 } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useSession } from "next-auth/react"

export default function BannerEditor() {
    const [navItems, setNavItems] = useState([
        { id: 1, label: "Home", url: "/" },
        { id: 2, label: "About Us", url: "/about" },
        { id: 3, label: "Services", url: "/services" },
    ])
    const [logo, setLogo] = useState<string | null>(null)
    const [logoFile, setLogoFile] = useState<File | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const session = useSession()
    const token = (session?.data?.user as { token: string })?.token

    const handleNavItemChange = (id: number, field: "label" | "url", value: string) => {
        setNavItems(prevItems => prevItems.map(item => (item.id === id ? { ...item, [field]: value } : item)))
    }

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setLogoFile(file)
            // Create a preview URL for the image
            const previewUrl = URL.createObjectURL(file)
            setLogo(previewUrl)
        }
    }

    useEffect(() => {
        const fetchMenuData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/menu`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (!response.ok) throw new Error("Failed to fetch menu data")

                const data = await response.json()

                if (data && data.data) {
                    const menu = data.data
                    const items = [
                        { id: 1, label: menu.name1 || "Home", url: menu.link1 || "/" },
                        { id: 2, label: menu.name2 || "About", url: menu.link2 || "/about" },
                        { id: 3, label: menu.name3 || "Services", url: menu.link3 || "/services" },
                    ]

                    setNavItems(items)

                    // Set logo if available (check if it's not null and not empty string)
                    if (menu.logo) {
                        // Construct full URL if it's just a filename
                        const logoUrl = menu.logo.startsWith('http') 
                            ? menu.logo 
                            : `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${menu.logo}`
                        setLogo(logoUrl)
                    }
                }
            } catch (err) {
                console.error("Error fetching menu data:", err)
            }
        }

        if (token) {
            fetchMenuData()
        }
    }, [token])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        const formData = new FormData()

        // Append nav items (up to 3)
        navItems.slice(0, 3).forEach((item, index) => {
            formData.append(`name${index + 1}`, item.label)
            formData.append(`link${index + 1}`, item.url)
        })

        // Append logo file if a new one was uploaded
        if (logoFile) {
            formData.append("logo", logoFile)
        } else if (logo) {
            // If no new file but logo exists, send the existing logo path
            // Extract just the filename if it's a full URL
            const logoPath = logo.includes('/storage/') 
                ? logo.split('/storage/')[1] 
                : logo
            formData.append("logo", logoPath)
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/menu`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            })

            const result = await response.json()
            if (response.ok) {
                console.log("Success:", result)
                // Update the logo URL if a new one was uploaded
                if (result.data?.logo) {
                    const newLogoUrl = result.data.logo.startsWith('http') 
                        ? result.data.logo 
                        : `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${result.data.logo}`
                    setLogo(newLogoUrl)
                }
            } else {
                console.error("Error:", result)
            }
        } catch (error) {
            console.error("Submit failed:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="container mx-auto px-4 py-2">
            <Card className="w-full">
                <CardHeader className="text text-center">
                    <CardTitle className="text-2xl">Navigation & Logo Editor</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            {/* Navigation Items Section */}
                            <div>
                                <h3 className="text-lg font-medium mb-4">Navigation Menu Items</h3>
                                <div className="space-y-4">
                                    {navItems.map((item) => (
                                        <div key={item.id} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor={`nav-label-${item.id}`}>Label</Label>
                                                <Input
                                                    id={`nav-label-${item.id}`}
                                                    value={item.label}
                                                    onChange={(e) => handleNavItemChange(item.id, "label", e.target.value)}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor={`nav-url-${item.id}`}>URL</Label>
                                                <Input
                                                    id={`nav-url-${item.id}`}
                                                    value={item.url}
                                                    onChange={(e) => handleNavItemChange(item.id, "url", e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Logo Upload Section */}
                            <div className="pt-4 border-t">
                                <h3 className="text-lg font-medium mb-4">Logo</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="logo-upload">Upload Logo</Label>
                                        <div className="flex items-center gap-2">
                                            <Input
                                                id="logo-upload"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleLogoUpload}
                                                className="flex-1"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Logo Preview</Label>
                                        <div className="border rounded-md p-4 flex items-center justify-center h-32 bg-muted">
                                            {logo ? (
                                                <Image
                                                    src={logo}
                                                    alt="Logo Preview"
                                                    width={150}
                                                    height={80}
                                                    className="max-h-24 object-contain"
                                                    unoptimized={logo.startsWith('blob:')} // For blob URLs
                                                />
                                            ) : (
                                                <div className="flex flex-col items-center text-muted-foreground">
                                                    <Upload className="h-10 w-10 mb-2" />
                                                    <span>No logo uploaded</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <CardFooter className="flex justify-end px-0 pt-6 mt-6 border-t">
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Saving Changes...
                                    </>
                                ) : (
                                    "Save Changes"
                                )}
                            </Button>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}