import React, { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Radio, Space } from "antd";
import * as Yup from "yup";
import { Formik, Form } from "formik";
// @ts-ignore
import studLogo from "./assets/stud-logo.png";
// @ts-ignore
import heroImage from "./assets/stud-early-access.png";
import { Button, FormItem } from "./components";
import { checkEmailExists, createEarlyAccessEntry } from "./api/helpers";

const formInitialValues = { firstName: "", lastName: "", email: "" };

const formValidationSchema = Yup.object().shape({
  firstName: Yup.string(),
  lastName: Yup.string(),
  email: Yup.string().email(),
});

const formData = {
  firstName: { label: "First name", placeholder: "John" },
  lastName: { label: "Last name", placeholder: "Doe" },
  email: { label: "Email address", placeholder: "johndoe@email.com" },
};

const options = [
  { label: "A student", value: "Medical Student" },
  { label: "A health professional", value: "Health Professional" },
  { label: "Just likes to learn", value: "Other" },
];

const App: React.FunctionComponent = () => {
  const [occupation, setOccupation] = useState("Medical Student");
  const containerRef: React.MutableRefObject<HTMLDivElement | undefined> =
    useRef();
  const [containerHeight, setContainerHeight] = useState(0);
  const [windowHeight] = useState(window.innerHeight);
  const [windowWidth] = useState(window.innerWidth);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setContainerHeight(containerRef.current?.offsetHeight as number);
  }, [containerRef.current?.offsetHeight]);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
      />
      <div className="flex flex-col lg:flex-row-reverse justify-between w-full">
        <div
          style={{
            height:
              windowWidth > 1023
                ? containerHeight > windowHeight
                  ? `${containerHeight}px`
                  : "100vh"
                : "80vh",
          }}
          className="relative w-full lg:w-[50%] h-[75vh] sm:h-[80vh] lg:h-screen"
        >
          <img
            className="w-full h-full object-cover object-center"
            src={heroImage}
            alt="Stud early access hero desktop"
          />
          <img
            className="absolute top-[30px] right-[24px] w-[50px] sm:w-[80px] h-auto"
            src={studLogo}
            alt="stud logo"
          />
          <div className="lg:hidden px-8 text-white w-screen flex flex-col absolute top-16 left-[50%] translate-x-[-50%]">
            <div className="flex flex-col">
              <h2 className="text-[28px] text-center  font-gotham_bold font-bold leading-[32px]">
                <span>Learn</span>
                <span className="text-[#9999CC]"> smart,</span>
              </h2>
              <h2 className="text-[28px] text-center font-gotham_bold font-bold leading-[32px]">
                <span>Learn</span>
                <span className="text-[#9999CC]"> easy,</span>
              </h2>
              <h2 className="text-[28px] text-center font-gotham_bold font-bold leading-[32px]">
                <span>Learn with</span>
                <span className="text-[#9999CC]"> STUD.</span>
              </h2>
            </div>
            <span className="text-center">
              Be the first to get access when we launch!
            </span>
          </div>
        </div>
        <div
          ref={containerRef as any}
          className="w-full lg:w-[50%] py-8 sm:py-12 lg:py-6 pr-11 pl-11 sm:pl-16 flex font-gotham flex-col gap-y-8"
        >
          <div className="hidden lg:flex flex-col gap-y-4">
            <div className="flex flex-col">
              <h2 className="text-[64px] font-gotham_bold font-bold leading-[68px]">
                <span>Learn</span>
                <span className="text-[#2E3192]"> smart,</span>
              </h2>
              <h2 className="text-[64px] font-gotham_bold font-bold leading-[68px]">
                <span>Learn</span>
                <span className="text-[#2E3192]"> easy,</span>
              </h2>
              <h2 className="text-[64px] font-gotham_bold font-bold leading-[68px]">
                <span>Learn with</span>
                <span className="text-[#2E3192]"> STUD.</span>
              </h2>
            </div>
            <span>Be the first to get access when we launch!</span>
          </div>
          <Formik
            initialValues={formInitialValues}
            onSubmit={async (values, { setFieldError, resetForm }) => {
              setLoading(true);
              try {
                const emailExists = await checkEmailExists(values.email);

                if (emailExists) {
                  toast.error("You already submitted a response!");
                  setLoading(false);
                  return;
                } else {
                  if (!values.firstName) {
                    setFieldError("firstName", "Required");
                  }

                  if (!values.lastName) {
                    setFieldError("lastName", "Required");
                  }

                  if (!values.email) {
                    setFieldError("email", "Required");
                  }
                  await createEarlyAccessEntry({ ...values, occupation });
                  toast(
                    "We have received your entry! Welcome to the STUD community."
                  );
                  setLoading(false);
                  window.localStorage.setItem(
                    "stud_early_access_email",
                    values.email
                  );
                  resetForm();
                }
              } catch (err) {
                console.log(err);
                toast.error("An error occurred, please try again.");
                setLoading(false);
              }
            }}
            validationSchema={formValidationSchema}
          >
            {({ handleSubmit, errors }) => (
              <Form>
                <div className="w-full flex flex-col items-center gap-y-8">
                  <div
                    id="name"
                    className="w-full flex flex-col sm:flex-row gap-y-6 sm:gap-y-0 sm:gap-x-12"
                  >
                    <FormItem
                      label={formData.firstName.label}
                      required
                      name="firstName"
                      placeholder={formData.firstName.placeholder}
                      errorMessage={errors.firstName}
                    />
                    <FormItem
                      label={formData.lastName.label}
                      required
                      name="lastName"
                      placeholder={formData.lastName.placeholder}
                      errorMessage={errors.lastName}
                    />
                  </div>
                  <FormItem
                    label={formData.email.label}
                    name="email"
                    required
                    placeholder={formData.email.placeholder}
                    errorMessage={errors.email}
                  />
                  <div className="w-full flex flex-col gap-y-4">
                    <label
                      htmlFor="occupation"
                      className="font-bold font-gotham text-lg leading-3"
                    >
                      You are
                    </label>
                    <Radio.Group
                      id="occupation"
                      name="occupation"
                      onChange={(e) => {
                        setOccupation(e.target.value);
                      }}
                      value={occupation}
                    >
                      <Space direction="vertical">
                        {options.map((option) => (
                          <Radio
                            className="font-gotham text-base  leading-4"
                            value={option.value}
                            key={option.value}
                          >
                            {option.label}
                          </Radio>
                        ))}
                      </Space>
                    </Radio.Group>
                  </div>
                  <div className="w-full max-w-[360px]">
                    <Button
                      label="Sign Up for Early Access"
                      type="submit"
                      onClick={handleSubmit}
                      loading={loading}
                    />
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default App;
