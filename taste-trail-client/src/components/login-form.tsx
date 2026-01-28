"use client"
import { cn } from "@/lib/utils"
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
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Link from "next/link"
import { signIn } from "@/services/authService"
import { toast } from "sonner"

const loginValidationSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      "Password must include uppercase, lowercase, number, and special character"
    ),
});


export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const form = useForm({
    resolver: zodResolver(loginValidationSchema)
  })

  const { formState: { isSubmitting } } = form

  const handleSignIn = async (data: FieldValues) => {
    const res = await signIn(data)

    if (res.success) {
      toast.success(res.message || "Account created successfully!")
      form.reset()
    }
    else {
      toast.error(res.errorMessage || "Failed to create account. Please try again.")
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(handleSignIn)}>
            <FieldGroup>
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
              <Field>
                <Button disabled={isSubmitting} type="submit">{isSubmitting ? "Logging in..." : "Login"}</Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link href="/signup">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
