import { Poppins } from "next/font/google";
import "./globals.css";
import AmplifyConfig from "./utils/AmplifyConfig";
import AuthenticationCheck from "./utils/AuthenticationCheck";

const font = Poppins({ subsets: ["latin"], weight: ['200', '600'] });

export const metadata = {
  title: "Thomp",
  description: "A place to dump your thoughts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>
        {/* We put the our amplify configuration here to make sure it runs on
        the client. */}
        <AmplifyConfig />
        <AuthenticationCheck />
        {children}
      </body>
    </html>
  );
}
