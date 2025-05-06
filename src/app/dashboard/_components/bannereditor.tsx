"use client"

import { useEffect, useState } from "react"
import { Upload, Loader2 } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useSession } from "next-auth/react"
import { useCallback } from "react"; // make sure this is imported at the top
import { toast } from "sonner"

export default function BannerEditor() {
    const [navItems, setNavItems] = useState([
        { id: 1, label: "Home", url: "/" },
        { id: 2, label: "About Us", url: "/about" },
        { id: 3, label: "Services", url: "/services" },
        { id: 4, label: "Contact", url: "/contact" },
    ])
    const [logo, setLogo] = useState<string | null>(null)
    const [logoFile, setLogoFile] = useState<File | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const session = useSession()
    const token = (session.data?.user as { token: string })?.token

    const handleNavItemChange = (id: number, field: "label" | "url", value: string) => {
        setNavItems(prevItems => prevItems.map(item => (item.id === id ? { ...item, [field]: value } : item)))
    }

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Validate file type
        if (!file.type.startsWith('image/')) {
            toast.error("Please upload an image file")
            return
        }

        setLogoFile(file)
        const previewUrl = URL.createObjectURL(file)
        setLogo(previewUrl)
    }

    

    const fetchMenuData = useCallback(async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/menu`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error("Failed to fetch menu data");

            const { data } = await response.json();

            if (data) {
                const items = [
                    { id: 1, label: data.name1 || "Home", url: data.link1 || "/" },
                    { id: 2, label: data.name2 || "About Us", url: data.link2 || "/about" },
                    { id: 3, label: data.name3 || "Services", url: data.link3 || "/services" },
                    { id: 4, label: data.name4 || "Contact", url: data.link4 || "/contact" },
                ];

                setNavItems(items);

                if (data.logo) {
                    const logoUrl = data.logo.startsWith("http")
                        ? data.logo
                        : `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${data.logo}`;
                    setLogo(logoUrl);
                }
            }
        } catch (err) {
            console.error("Error fetching menu data:", err);
            toast.error("Failed to load menu data");
        } finally {
            setIsLoading(false);
        }
    }, [token]); // token is now a dependency


    useEffect(() => {
        if (token) {
            fetchMenuData();
        }
    }, [token, fetchMenuData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const formData = new FormData()

            // Append all 4 menu items (as per your API structure)
            navItems.forEach((item, index) => {
                formData.append(`name${index + 1}`, item.label)
                formData.append(`link${index + 1}`, item.url)
            })

            // Append logo file if a new one was uploaded
            if (logoFile) {
                formData.append("logo", logoFile)
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/menu`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.message || "Failed to save menu")
            }

            toast.success(result.message || "Menu saved successfully!")

            // Update the logo URL if a new one was uploaded
            if (result.data?.logo) {
                const newLogoUrl = result.data.logo.startsWith('http')
                    ? result.data.logo
                    : `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${result.data.logo}`
                setLogo(newLogoUrl)
                setLogoFile(null) // Clear the file after successful upload
            }

            // Reset file input
            const fileInput = document.getElementById('logo-upload') as HTMLInputElement
            if (fileInput) fileInput.value = ''
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to save menu"
            toast.error(errorMessage)
            console.error("Submit failed:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        )
    }

    return (
        <div className="">
            <Card className="">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">Navigation Menu Editor</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Navigation Items Section */}
                        <div>
                            <h3 className="text-lg font-medium mb-4">Menu Items</h3>
                            <div className="space-y-4">
                                {navItems.map((item) => (
                                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor={`nav-label-${item.id}`}>Label {item.id}</Label>
                                            <Input
                                                id={`nav-label-${item.id}`}
                                                value={item.label}
                                                onChange={(e) => handleNavItemChange(item.id, "label", e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor={`nav-url-${item.id}`}>URL {item.id}</Label>
                                            <Input
                                                id={`nav-url-${item.id}`}
                                                value={item.url}
                                                onChange={(e) => handleNavItemChange(item.id, "url", e.target.value)}
                                                required
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
                                    <Label htmlFor="logo-upload">Upload New Logo</Label>
                                    <Input
                                        id="logo-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleLogoUpload}
                                        className="cursor-pointer"
                                    />
                                    <p className="text-sm text-muted-foreground">
                                        Recommended size: 300x100px (Max 2MB)
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Label>Logo Preview</Label>
                                    <div className="border rounded-md p-4 flex items-center justify-center h-32 bg-muted">
                                        {logo ? (
                                            <Image
                                                src={logo}
                                                alt="Logo Preview"
                                                width={200}
                                                height={80}
                                                className="max-h-full max-w-full object-contain"
                                                unoptimized={logo.startsWith('blob:')}
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = '/placeholder.svg'
                                                }}
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

                        <CardFooter className="flex justify-end px-0 pt-6 mt-6 border-t">
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Saving...
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