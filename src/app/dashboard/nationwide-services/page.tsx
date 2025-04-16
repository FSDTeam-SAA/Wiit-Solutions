"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
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

// Define types for our form data
interface FormData {
  title: string;
  subtitles: string[];
  descriptions: string[];
  customIcons: (File | null)[];
  customIconPreviews: (string | null)[];
  image: File | null;
  imagePreview: string | null;
}

export default function EditableContentForm() {
  const [formData, setFormData] = useState<FormData>({
    title: "Main Title",
    subtitles: ["Subtitle 1", "Subtitle 2", "Subtitle 3", "Subtitle 4"],
    descriptions: [
      "Description for section 1",
      "Description for section 2",
      "Description for section 3",
      "Description for section 4",
    ],
    customIcons: [null, null, null, null],
    customIconPreviews: [null, null, null, null],
    image: null,
    imagePreview: null,
  });

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted with data:", {
      title: formData.title,
      subtitles: formData.subtitles,
      descriptions: formData.descriptions,
      customIcons: formData.customIcons.map((file) =>
        file ? file.name : null
      ),
      image: formData.image ? formData.image.name : null,
    });
  };

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
                          alt="Custom icon"
                          className="h-6 w-6 object-contain"
                        />
                      </div>
                      <span className="ml-2 text-sm text-muted-foreground">
                        {formData.customIcons[index]?.name || ""}
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
                    src={formData.imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    className="max-h-[200px] w-full object-contain"
                  />
                </div>
              ) : (
                <div className="mt-4 border rounded-md p-8 flex flex-col items-center justify-center bg-muted">
                  <ImageIcon className="h-10 w-10 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mt-2">
                    No image selected
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <CardFooter className="flex justify-end">
          <Button type="submit">Save Changes</Button>
        </CardFooter>
      </form>
    </div>
  );
}
