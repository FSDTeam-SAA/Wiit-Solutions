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
  image: File | null | string;
  imagePreview: string | null;
}

export default function EditableContentForm() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    subtitles: ["", "", "", ""],
    descriptions: ["", "", "", ""],
    customIcons: [null, null, null, null],
    customIconPreviews: [null, null, null, null],
    image: null,
    imagePreview: null,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { data: session } = useSession();
  const token = (session?.user as { token: string })?.token;

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
            img,
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
            image: img,
            imagePreview: img,
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

    if (token) {
      fetchData();
    }
  }, [token]);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, title: e.target.value });
  };

  const handleSubtitleChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const newSubtitles = [...formData.subtitles];
    newSubtitles[index] = e.target.value;
    setFormData({ ...formData, subtitles: newSubtitles });
  };

  const handleDescriptionChange = (
    index: number,
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newDescriptions = [...formData.descriptions];
    newDescriptions[index] = e.target.value;
    setFormData({ ...formData, descriptions: newDescriptions });
  };

  const handleCustomIconChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const newCustomIcons = [...formData.customIcons];
        const newCustomIconPreviews = [...formData.customIconPreviews];
        newCustomIcons[index] = file;
        newCustomIconPreviews[index] = reader.result as string;
        setFormData({
          ...formData,
          customIcons: newCustomIcons,
          customIconPreviews: newCustomIconPreviews,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: file,
          imagePreview: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      
      formData.subtitles.forEach((subtitle, index) => {
        formDataToSend.append(`subtitle${index + 1}`, subtitle);
      });
      
      formData.descriptions.forEach((description, index) => {
        formDataToSend.append(`description${index + 1}`, description);
      });

      // Handle icon files
      formData.customIcons.forEach((icon, index) => {
        if (icon instanceof File) {
          formDataToSend.append(`icon${index + 1}`, icon);
        } else if (typeof icon === 'string') {
          // If it's a string (URL), we might want to keep it as is
          // or handle differently based on your API requirements
          formDataToSend.append(`icon${index + 1}_url`, icon);
        }
      });

      // Handle main image
      if (formData.image instanceof File) {
        formDataToSend.append("image", formData.image);
      } else if (typeof formData.image === 'string') {
        formDataToSend.append("image_url", formData.image);
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
        alert("Service content saved successfully.");
      } else {
        alert(result.message || "Failed to save content.");
      }
    } catch (err) {
      console.error("Error saving content:", err);
      alert("An error occurred while saving content.");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Edit Content</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Title Section */}
        <Card>
          <CardHeader>
            <CardTitle>Main Title</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={handleTitleChange}
              />
            </div>
          </CardContent>
        </Card>

        {/* Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[0, 1, 2, 3].map((index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>Section {index + 1}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`subtitle-${index}`}>Subtitle</Label>
                  <Input
                    id={`subtitle-${index}`}
                    value={formData.subtitles[index]}
                    onChange={(e) => handleSubtitleChange(index, e)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`description-${index}`}>Description</Label>
                  <Textarea
                    id={`description-${index}`}
                    value={formData.descriptions[index]}
                    onChange={(e) => handleDescriptionChange(index, e)}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`custom-icon-${index}`}>Upload Icon</Label>
                  <Input
                    id={`custom-icon-${index}`}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleCustomIconChange(index, e)}
                  />

                  {formData.customIconPreviews[index] ? (
                    <div className="mt-2 p-2 border rounded flex justify-center items-center">
                      <div className="flex items-center justify-center h-10 w-10 bg-muted rounded-md">
                        <Image
                          src={
                            formData.customIconPreviews[index] ||
                            "/placeholder.svg"
                          }
                          width={40}
                          height={40}
                          alt={`Custom icon ${index + 1}`}
                          className="h-6 w-6 object-contain"
                        />
                      </div>
                      <span className="ml-2 text-sm text-muted-foreground">
                        {typeof formData.customIcons[index] === 'string' 
                          ? 'Existing icon'
                          : (formData.customIcons[index] as File)?.name || ""}
                      </span>
                    </div>
                  ) : (
                    <div className="mt-2 p-2 border rounded flex flex-col items-center justify-center bg-muted">
                      <ImageIcon className="h-6 w-6 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground mt-1">
                        No icon selected
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Image Section */}
        <Card>
          <CardHeader>
            <CardTitle>Featured Image</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="image">Upload Image</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>

              {formData.imagePreview ? (
                <div className="mt-4 border rounded-md overflow-hidden">
                  <Image
                    src={typeof formData.imagePreview === 'string' 
                      ? formData.imagePreview 
                      : URL.createObjectURL(formData.imagePreview as unknown as Blob)}
                    width={400}
                    height={400}
                    alt="Featured Image"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="mt-4 p-2 border rounded flex flex-col items-center justify-center bg-muted">
                  <ImageIcon className="h-6 w-6 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground mt-1">
                    No image selected
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <CardFooter className="flex justify-center">
          <Button type="submit" className="w-full max-w-sm">
            Save Changes
          </Button>
        </CardFooter>
      </form>
    </div>
  );
}