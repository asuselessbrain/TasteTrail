"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Controller, FieldValues, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { signUp } from "@/services/authService"
import { toast } from "sonner"
import Link from "next/link"

const userValidationSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email format"),
  profilePhoto: z
    .any()
    .refine((file) => file instanceof File && file.type.startsWith("image/"), {
      message: "Profile photo is required and must be an image",
    }),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      "Password must include uppercase, lowercase, number, and special character"
    ),
  confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});



export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {

  const form = useForm({
    resolver: zodResolver(userValidationSchema)
  })

  const { formState: { isSubmitting } } = form

  const handleSignUp = async (data: FieldValues) => {
    if (data.profilePhoto) {
      const formData = new FormData()
      formData.append("file", data.profilePhoto)
      formData.append("upload_preset", "my_preset");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dwduymu1l/image/upload",
        { method: "POST", body: formData }
      )
      const result = await res.json()
      data.profilePhoto = result.secure_url
    }

    const res = await signUp(data)

    if (res.success) {
      toast.success(res.message || "Account created successfully!")
      form.reset()
    }
    else {
      toast.error(res.errorMessage || "Failed to create account. Please try again.")
    }
  }
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(handleSignUp)}>
          <FieldGroup>
            <Controller
              name="fullName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                  <Input
                    {...field}
                    type="text"
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Arfan Ahmed"
                    autoComplete="off"
                    value={field.value || ""}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    {...field}
                    type="email"
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="arfan@gmail.com"
                    autoComplete="off"
                    value={field.value || ""}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="********"
                    autoComplete="off"
                    value={field.value || ""}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="********"
                    autoComplete="off"
                    value={field.value || ""}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="profilePhoto"
              control={form.control}
              defaultValue={undefined}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Profile Photo</FieldLabel>
                  <Input
                    type="file"
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    onChange={(e) => field.onChange(e.target.files?.[0])} // pass File object
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <FieldGroup>
              <Field>
                <Button disabled={isSubmitting} type="submit">{isSubmitting ? "Creating Account..." : "Create Account"}</Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <Link href="/login">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
