"use client"

import type React from "react"

import { useState } from "react"
import { Upload, Loader2 } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"


export default function BannerEditor() {
    // State for navigation items
    const [navItems, setNavItems] = useState([
        { id: 1, label: "Home", url: "/" },
        { id: 2, label: "About Us", url: "/about" },
        { id: 3, label: "Nationwide Services", url: "/services" },
        { id: 4, label: "Contact Us", url: "/contact" },
    ])

    // State for logo
    const [logo, setLogo] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)


    // Handle nav item change
    const handleNavItemChange = (id: number, field: "label" | "url", value: string) => {
        setNavItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
    }

    // Handle logo upload
    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (event) => {
                setLogo(event.target?.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate API call
        setTimeout(() => {
            console.log("Form Data:", {
                navItems,
                logo,
            })
            setIsSubmitting(false)
        }, 1500)





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
                                                    src={logo || "/placeholder.svg"}
                                                    alt="Logo Preview"
                                                    width={150}
                                                    height={80}
                                                    className="max-h-24 object-contain"
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
