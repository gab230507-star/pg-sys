import { requireAuth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const user = await requireAuth()

<<<<<<< HEAD
  // ✅ garante que roles é sempre array
  const roles = Array.isArray(user.role)
    ? user.role
    : user.role
      ? [String(user.role).toLowerCase()]
      : []

  // Se só tem role comercial (e não admin), redireciona para reuniões
  if (roles.includes("comercial") && !roles.includes("admin")) {
    redirect("/reunioes")
  }

  return (
    <div>
      {/* seu conteúdo */}
    </div>
=======
  // Se só tem role comercial (e não admin), redireciona para Reuniões
  if (user.roles.includes("comercial") && !user.roles.includes("admin")) {
    redirect("/reunioes")
  }

  // Se não tem role admin, não pode ver o dashboard
  if (!user.roles.includes("admin")) {
    redirect("/login")
  }

  const stores = await getStores() as StoreData[]

  return (
    <DashboardLayout userRoles={user.roles}>
      <StoreCards initialStores={stores} />
    </DashboardLayout>
>>>>>>> 76bd796721e53a5a9f8b9d8c8e049ae22314025a
  )
}
