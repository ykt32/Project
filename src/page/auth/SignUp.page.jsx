import React, { useEffect } from "react";
import {
  Card,
  CardDescription,
  CardTitle,
  CardContent,
  CardHeader,
} from "../../components/ui/card";
import AuthGuard from "../../components/guard/Auth.guard";
import { Button } from "../../components/ui/button";
import { Formik, Form, ErrorMessage } from "formik";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useSignUpMutation } from "../../store/service/endpoints/auth.endpoint";
import { useToast } from "../../components/ui/use-toast";
const SignUpPage = () => {
  const [fun, data] = useSignUpMutation();
  const nav = useNavigate();
  const { toast } = useToast();
  const initialValue = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };
  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Enter Your Name")
      .min(2, "Must be longer than 2 letter "),
    email: yup.string().required("Email Is Required").email("invalid Email"),
    password: yup
      .string()
      .required("Password Is Required")
      .min(8, "Password Should be 8 letter"),
    password_confirmation: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password"), null, "Incorrect password"]),
  });

  const handleSubmit = async (value) => {
    await fun(value);
  };
  useEffect(() => {
    if (data.error) {
      toast({
        title: "Auth Error From Server",
        description: data.error.data.message,
      });
    } else if (data.data) {
      nav("/");
    }
  }, [data]);

  return (
    <AuthGuard path="/sign_up">
      <div className="w-3/5 mx-auto  h-full flex justify-center items-center">
        <Card className="basis-2/4 p-5	">
          <CardHeader className="flex flex-row justify-between mb-5">
            <CardTitle>Sign Up</CardTitle>
            <CardDescription className="text-basic">
              <Link to="/">Already have an account</Link>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Formik
              validationSchema={validationSchema}
              initialValues={initialValue}
              onSubmit={handleSubmit}
              validateOnBlur={false}
              validateOnChange={false}
            >
              {({ handleBlur, handleChange, values, isSubmitting }) => (
                <>
                  <Form className="flex flex-col gap-4 ">
                    <Label htmlFor="name">Name</Label>

                    <Input
                      onBlur={handleBlur}
                      value={values.name}
                      onChange={handleChange}
                      type="text"
                      name="name"
                      id="name"
                    />
                    <ErrorMessage
                      className="text-danger text-xs"
                      component={"p"}
                      name="name"
                    />

                    <Label htmlFor="email">Email Address</Label>

                    <Input
                      onBlur={handleBlur}
                      value={values.email}
                      onChange={handleChange}
                      type="email"
                      name="email"
                      id="email"
                    />
                    <ErrorMessage
                      className="text-danger text-xs"
                      component={"p"}
                      name="email"
                    />

                    <Label htmlFor="password">Password</Label>
                    <Input
                      onBlur={handleBlur}
                      value={values.password}
                      onChange={handleChange}
                      type="password"
                      name="password"
                      id="password"
                    />
                    <ErrorMessage
                      className="text-danger text-xs"
                      component={"p"}
                      name="password"
                    />

                    <Label htmlFor="password_confirmation">
                      Confirm Password
                    </Label>

                    <Input
                      onBlur={handleBlur}
                      value={values.password_confirmation}
                      onChange={handleChange}
                      type="password"
                      name="password_confirmation"
                      id="password_confirmation"
                    />
                    <ErrorMessage
                      className="text-danger text-xs"
                      component={"p"}
                      name="password_confirmation"
                    />

                    <Button
                      disabled={isSubmitting}
                      type="submit"
                      className="w-full bg-basic mt-3"
                    >
                      Sign Up
                      {isSubmitting && (
                        <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                      )}
                    </Button>
                  </Form>
                </>
              )}
            </Formik>
          </CardContent>
        </Card>
      </div>
    </AuthGuard>
  );
};

export default SignUpPage;
