export default function Footer() {
  return (
    <footer className="border-t bg-white py-10 text-sm">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 md:flex-row md:px-6">
        <p className="text-slate-600">© {new Date().getFullYear()} Cumberland Brooks, LLC. All rights reserved.</p>
        <div className="flex items-center gap-6 text-slate-600">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="/accessibility">Accessibility</a>
        </div>
      </div>
    </footer>
  );
}
