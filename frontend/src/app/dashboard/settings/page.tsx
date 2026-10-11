import { getCurrentUser } from '@/lib/server/users'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'

export default async function SettingsPage() {
  const user = await getCurrentUser()

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Settings
        </h1>

        <p className="mt-1 text-slate-500">
          Manage your account and preferences.
        </p>
      </div>

      <div className="space-y-6">
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Profile
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your personal account information.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Username
              </label>

              <input
                id="username"
                type="text"
                defaultValue={user?.username}
                disabled
                className="w-full rounded-lg border border-slate-300 bg-slate-100 px-3 py-2.5 text-slate-500 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                defaultValue={user?.email}
                disabled
                className="w-full rounded-lg border border-slate-300 bg-slate-100 px-3 py-2.5 text-slate-500 disabled:cursor-not-allowed"
              />
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-slate-900">
                Appearance
              </h2>

              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
                Coming soon
              </span>
            </div>

            <p className="mt-1 text-sm text-slate-500">
              Customize how WorkNest looks.
            </p>
          </div>

          <div className="max-w-xs">
            <Select
              id="theme"
              label="Theme"
              defaultValue="light"
              disabled
              options={[
                {
                  label: 'Light',
                  value: 'light',
                },
                {
                  label: 'Dark',
                  value: 'dark',
                },
                {
                  label: 'System',
                  value: 'system',
                },
              ]}
            />
          </div>
        </section>

        <section className="rounded-xl border border-red-200 bg-white p-6 shadow-sm">
          <div className="mb-5">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-red-600">
                Danger Zone
              </h2>

              <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-500">
                Coming soon
              </span>
            </div>

            <p className="mt-1 text-sm text-slate-500">
              Irreversible account actions.
            </p>
          </div>

          <Button
            variant="danger"
            disabled
          >
            Delete Account
          </Button>
        </section>
      </div>
    </div>
  )
}