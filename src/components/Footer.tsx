import type { FooterProps } from "@/lib/Footer";

export default function Footer({ year, fullName, studentId }: FooterProps) {
  return (
    <footer className="w-full text-center">
      <p className="text-foreground bg-secondary p-4 m-0">
        Copyright © {year} {fullName} {studentId}
      </p>
    </footer>
  );
}
