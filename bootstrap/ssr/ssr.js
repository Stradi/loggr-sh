import * as jsxRuntime from "react/jsx-runtime";
import clsx from "clsx";
import { useForm, Head, createInertiaApp } from "@inertiajs/react";
import createServer from "@inertiajs/react/server";
import ReactDOMServer from "react-dom/server";
const Fragment = jsxRuntime.Fragment;
const jsx = jsxRuntime.jsx;
const jsxs = jsxRuntime.jsxs;
function Button({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      className: clsx(
        "p-2 flex items-center justify-center leading-loose text-center rounded-xl font-semibold text-neutral-100",
        "transition-[box-shadow,background-color] duration-150",
        "bg-neutral-900 hover:bg-neutral-800",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-600"
      ),
      ...props
    }
  );
}
function Input({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      ...props,
      className: clsx(
        "px-4 py-2 rounded-xl ring-1 ring-neutral-300 ring-offset-0",
        "transition-[box-shadow] duration-150 text-neutral-800",
        "hover:ring-neutral-600",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-600",
        className
      )
    }
  );
}
function InputError({ className, children, ...rest }) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: clsx("text-sm font-medium text-red-500", className),
      ...rest,
      children
    }
  );
}
function Label({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "label",
    {
      className: clsx("text-sm font-medium text-neutral-700 mb-1", className),
      ...props
    }
  );
}
function AuthenticationLayout({ children, className }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: clsx(
        "max-w-sm mx-auto w-full h-screen flex justify-center items-center",
        className
      ),
      children
    }
  );
}
function Page() {
  const { data, setData, post, processing, errors } = useForm({
    handle: "",
    email: "",
    password: "",
    password_confirmation: ""
  });
  function onSubmit(e) {
    e.preventDefault();
    post(route("register"));
  }
  return /* @__PURE__ */ jsxs(AuthenticationLayout, { className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ jsxs("header", { className: "w-full mb-4", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-xl text-neutral-700 font-medium", children: "Create your account" }),
      /* @__PURE__ */ jsx("p", { className: "text-neutral-700", children: "Start writing and connect with same minded people." })
    ] }),
    /* @__PURE__ */ jsx("main", { className: "w-full", children: /* @__PURE__ */ jsxs(
      "form",
      {
        onSubmit,
        className: "flex flex-col gap-4 [&>*]:flex [&>*]:flex-col [&>*]:gap-1",
        children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs(Label, { htmlFor: "handle", children: [
              "Username ",
              /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "handle",
                type: "text",
                value: data.handle,
                onChange: (e) => setData("handle", e.target.value),
                placeholder: "jonsnow"
              }
            ),
            errors.handle && /* @__PURE__ */ jsx(InputError, { children: errors.handle })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs(Label, { htmlFor: "email", children: [
              "Email ",
              /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "email",
                type: "email",
                value: data.email,
                onChange: (e) => setData("email", e.target.value),
                placeholder: "jon@snow.com"
              }
            ),
            errors.email && /* @__PURE__ */ jsxs(InputError, { children: [
              errors.email,
              " "
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs(Label, { htmlFor: "password", children: [
              "Password ",
              /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "password",
                type: "password",
                value: data.password,
                onChange: (e) => setData("password", e.target.value),
                placeholder: "**************"
              }
            ),
            errors.password && /* @__PURE__ */ jsxs(InputError, { children: [
              errors.password,
              " "
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs(Label, { htmlFor: "password_confirmation", children: [
              "Password Confirmation ",
              /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "password_confirmation",
                type: "password",
                value: data.password_confirmation,
                onChange: (e) => setData("password_confirmation", e.target.value),
                placeholder: "**************"
              }
            ),
            errors.password_confirmation && /* @__PURE__ */ jsxs(InputError, { children: [
              errors.password_confirmation,
              " "
            ] })
          ] }),
          /* @__PURE__ */ jsx(Button, { type: "submit", children: "Register" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx("footer", { className: "w-full text-center text-sm space-y-2", children: /* @__PURE__ */ jsxs("p", { className: "text-neutral-700", children: [
      "Already have an account?",
      " ",
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "#",
          className: "underline font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-600 transition duration-150 rounded-md p-1",
          children: "Login"
        }
      )
    ] }) })
  ] });
}
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Page
}, Symbol.toStringTag, { value: "Module" }));
function Welcome({ auth, laravelVersion, phpVersion }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Welcome" }),
    /* @__PURE__ */ jsx("div", { children: "Welcome to Loggr" })
  ] });
}
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Welcome
}, Symbol.toStringTag, { value: "Module" }));
createServer(
  (page) => createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages = /* @__PURE__ */ Object.assign({ "./pages/auth/register.jsx": __vite_glob_0_0, "./pages/welcome.jsx": __vite_glob_0_1 });
      return pages[`./pages/${name}.jsx`];
    },
    setup: ({ App, props }) => /* @__PURE__ */ jsx(App, { ...props })
  })
);
