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
      <header className="border-b">
        <div className="flex h-16 items-center justify-between p-10">
          <h1 className="text-xl font-bold">Trello Clone</h1>
          <nav className="flex gap-4 items-center">
            <Link href="#features">Features</Link>
            <Link
              href="/auth/login"
              className="rounded bg-black px-4 py-2 text-white"
            >
              Login
            </Link>
          </nav>
        </div>
      </header>
      <main>
        <section className="py-24 text-center">
          <div className="">
            <h2 className="mb-6 text-5xl font-bold leading-tight">
              Manage your work <br />
              <span className="text-blue-600">like Trello</span>
            </h2>

            <p className="mx-auto mb-8 max-w-xl text-gray-600">
              A simple Kanban board to organize tasks, collaborate with your
              team and stay productive.
            </p>

            <div className="flex justify-center gap-4">
              <a
                href="/auth/register"
                className="rounded bg-blue-600 px-6 py-3 text-white"
              >
                Get Started Free
              </a>
              <a href="#features" className="rounded border px-6 py-3">
                Learn More
              </a>
            </div>
          </div>
        </section>
        <section id="features" className="bg-gray-50 py-20">
          <div className="p-10">
            <h3 className="mb-12 text-center text-3xl font-bold">
              Powerful Features
            </h3>

            <div className="grid gap-8 md:grid-cols-3">
              {FEATURES.map((f) => (
                <div
                  key={f.title}
                  className="rounded-lg bg-white p-6 shadow-sm"
                >
                  <h4 className="mb-2 text-xl font-semibold">{f.title}</h4>
                  <p className="text-gray-600">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-20 text-center">
          <div className="">
            <h3 className="mb-4 text-3xl font-bold">
              Ready to boost your productivity?
            </h3>
            <p className="mb-6 text-gray-600">
              Start managing your tasks today with our Trello clone.
            </p>
            <a
              href="/auth/register"
              className="rounded bg-black px-6 py-3 text-white"
            >
              Create Your Board
            </a>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Trello Clone. Built with Next.js.
      </footer>
    </div>
  );
}
