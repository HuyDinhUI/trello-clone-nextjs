import Image from "next/image";
import Link from "next/link";

const FEATURES = [
  {
    title: "Kanban Boards",
    desc: "Create boards, lists and cards just like Trello.",
  },
  {
    title: "Drag & Drop",
    desc: "Smooth drag and drop experience using modern libraries.",
  },
  {
    title: "Team Collaboration",
    desc: "Invite members and work together in real-time.",
  },
];

export default function Home() {
  return (
    <div>
      <header className="sticky top-0 z-50 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <div className="flex items-center">
              <Image src="/logo.png" width={50} height={50} alt="logo" />
              <span className="text-xl font-bold text-blue-600">Kanflow</span>
              </div>

            <nav className="hidden md:flex gap-6 text-sm text-gray-600">
              <a href="#features">Features</a>
              <a href="#">Solutions</a>
              <a href="#">Pricing</a>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm">
              Log in
            </Link>
            <Link
              href="/register"
              className="rounded bg-blue-600 px-4 py-2 text-sm text-white"
            >
              Get TaskFlow free
            </Link>
          </div>
        </div>
      </header>
      <main>
        <section className="bg-linear-to-br from-blue-600 to-indigo-700 text-white">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-24 md:grid-cols-2">
            {/* Left */}
            <div>
              <h1 className="mb-6 text-5xl font-bold leading-tight">
                Bring all your tasks,
                <br /> teammates, and tools
                <br /> together
              </h1>

              <p className="mb-8 text-lg text-blue-100">
                Keep everything in the same place—even if your team isn’t.
                Simple Kanban boards inspired by Trello.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <a
                  href="/register"
                  className="rounded bg-white px-6 py-3 font-semibold text-blue-600"
                >
                  Sign up – it’s free
                </a>
                <a
                  href="#features"
                  className="rounded border border-white px-6 py-3"
                >
                  Watch demo
                </a>
              </div>
            </div>

            {/* Right (Preview) */}
            <div className="relative">
              <div className="rounded-xl bg-white p-4 shadow-2xl">
                <div className="flex gap-4">
                  {["Todo", "Doing", "Done"].map((col) => (
                    <div key={col} className="w-48 rounded bg-gray-100 p-3">
                      <h4 className="mb-2 text-sm font-semibold text-gray-700">
                        {col}
                      </h4>
                      <div className="space-y-2">
                        <div className="rounded bg-white p-2 text-xs text-gray-700 shadow">
                          Design landing page
                        </div>
                        <div className="rounded bg-white p-2 text-xs text-gray-700 shadow">
                          Implement drag & drop
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="bg-gray-50 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="mb-12 text-center text-3xl font-bold">
              Everything you need to stay productive
            </h2>

            <div className="grid gap-8 md:grid-cols-3">
              {FEATURES.map((f) => (
                <div key={f.title} className="rounded-xl bg-white p-6 shadow">
                  <h3 className="mb-2 text-lg font-semibold">{f.title}</h3>
                  <p className="text-gray-600">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="bg-blue-600 py-20 text-center text-white">
          <h2 className="mb-4 text-3xl font-bold">
            Get started with TaskFlow today
          </h2>
          <p className="mb-6 text-blue-100">No credit card required.</p>
          <a
            href="/register"
            className="rounded bg-white px-6 py-3 font-semibold text-blue-600"
          >
            Sign up for free
          </a>
        </section>
      </main>
      <footer className="border-t py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Trello Clone. Built with Next.js.
      </footer>
    </div>
  );
}
