"use client";

import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";

interface FormData {
  title: string;
  subtitles: string[];
  descriptions: string[];
  customIcons: (File | null | string)[];
  customIconPreviews: (string | null)[];
  rightImage: {
    url: string | null;
    fileName: string | null;
    file: File | null;
  };
}

export default function EditableContentForm() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    subtitles: ["", "", "", ""],
    descriptions: ["", "", "", ""],
    customIcons: [null, null, null, null],
    customIconPreviews: [null, null, null, null],
    rightImage: {
      url: null,
      fileName: null,
      file: null
    }
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  const token = (session?.user as { token: string })?.token;
  console.log(error)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/service`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();

        // In your fetch data logic:
        if (data.success) {
          const {
            main_title,
            subtitle1,
            subtitle2,
            subtitle3,
            subtitle4,
            description1,
            description2,
            description3,
            description4,
            img, // Using the main image as right image
            icon1,
            icon2,
            icon3,
            icon4,
          } = data.data;

          setFormData({
            title: main_title,
            subtitles: [subtitle1, subtitle2, subtitle3, subtitle4],
            descriptions: [description1, description2, description3, description4],
            customIcons: [icon1, icon2, icon3, icon4],
            customIconPreviews: [icon1, icon2, icon3, icon4],
            rightImage: {
              url: img || null, // Using the main image here
              fileName: img ? img.split('/').pop() : null,
              file: null
            }
          });
        } else {
          setError("Failed to fetch service content.");
        }
      } catch {
        setError("Error fetching service content.");
      } finally {
        setIsLoading(false);
      }
    };

    if (token) fetchData();
  }, [token]);

  const handleRightImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          rightImage: {
            url: reader.result as string,
            fileName: file.name,
            file: file
          }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("main_title", formData.title);

      // Append other fields
      formData.subtitles.forEach((subtitle, i) =>
        formDataToSend.append(`subtitle${i + 1}`, subtitle)
      );
      formData.descriptions.forEach((desc, i) =>
        formDataToSend.append(`description${i + 1}`, desc)
      );

      // Append icons
      formData.customIcons.forEach((icon, i) => {
        if (icon instanceof File) {
          formDataToSend.append(`icon${i + 1}`, icon);
        }
      });

      // Append right image if exists
      if (formData.rightImage.file) {
        formDataToSend.append("img", formData.rightImage.file);
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/service`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSend,
        }
      );

      const result = await response.json();
      if (result.success) {
        alert("Service content saved successfully!");
      } else {
        alert(result.message || "Failed to save content.");
      }
    } catch (err) {
      console.error("Error saving content:", err);
      alert("An error occurred while saving content.");
    } finally {
      setIsLoading(false);
    }
  };

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>{error}</div>;

  return (
    <div className=" py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Edit Content</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Title Section */}
        <Card>
          <CardHeader><CardTitle>Main Title</CardTitle></CardHeader>
          <CardContent>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </CardContent>
        </Card>

        {/* Right Image Section - For future use */}
        <Card>
          <CardHeader><CardTitle>Right Image (Optional)</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="rightImage">Upload Right Image</Label>
              {formData.rightImage.url ? (
                <div className="relative h-48 w-full border rounded-md overflow-hidden bg-muted">
                  <Image
                    src={formData.rightImage.url}
                    alt="Right image preview"
                    fill
                    className="object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder.svg'
                    }}
                  />
                </div>
              ) : (
                <div className="h-48 w-full border rounded-md bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground">No image selected</span>
                </div>
              )}
              <Input
                id="rightImage"
                type="file"
                accept="image/*"
                onChange={handleRightImageChange}
                disabled={isLoading}
              />
              {formData.rightImage.fileName && (
                <p className="text-sm text-muted-foreground">
                  File: <span className="font-medium">{formData.rightImage.fileName}</span>
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Service Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[0, 1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader><CardTitle>Section {i + 1}</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <Label htmlFor={`subtitle-${i}`}>Subtitle</Label>
                <Input
                  id={`subtitle-${i}`}
                  value={formData.subtitles[i]}
                  onChange={(e) => {
                    const updated = [...formData.subtitles];
                    updated[i] = e.target.value;
                    setFormData({ ...formData, subtitles: updated });
                  }}
                />

                <Label htmlFor={`description-${i}`}>Description</Label>
                <Textarea
                  id={`description-${i}`}
                  value={formData.descriptions[i]}
                  onChange={(e) => {
                    const updated = [...formData.descriptions];
                    updated[i] = e.target.value;
                    setFormData({ ...formData, descriptions: updated });
                  }}
                  rows={3}
                />

                <Label htmlFor={`custom-icon-${i}`}>Upload Icon</Label>
                <Input
                  id={`custom-icon-${i}`}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        const icons = [...formData.customIcons];
                        const previews = [...formData.customIconPreviews];
                        icons[i] = file;
                        previews[i] = reader.result as string;
                        setFormData({ ...formData, customIcons: icons, customIconPreviews: previews });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />

                {formData.customIconPreviews[i] ? (
                  <div className="mt-2 p-2 border rounded flex items-center gap-2">
                    <Image
                      src={formData.customIconPreviews[i]!}
                      width={80}
                      height={80}
                      alt={`Icon ${i + 1}`}
                      className="h-20 w-20 object-contain"
                    />
                    <span className="text-sm text-muted-foreground">
                      {typeof formData.customIcons[i] === "string"
                        ? "Existing icon"
                        : (formData.customIcons[i] as File)?.name || ""}
                    </span>
                  </div>
                ) : (
                  <div className="p-2 border rounded flex flex-col items-center bg-muted">
                    <ImageIcon className="h-6 w-6 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground mt-1">No icon selected</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <CardFooter className="flex justify-center">
          <Button type="submit" className="w-full max-w-sm" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </form>
    </div>
  );
}