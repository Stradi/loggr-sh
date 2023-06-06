import clsx from "clsx";

export default function AuthenticationLayout({ children, className }) {
  return (
    <section
      className={clsx(
        "max-w-sm mx-auto w-full h-screen flex justify-center items-center",
        className
      )}
    >
      {children}
    </section>
  );
}
