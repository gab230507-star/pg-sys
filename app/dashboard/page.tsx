import { redirect } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { StoreCards } from "@/components/store-cards"
import { requireAuth } from "@/lib/auth"
import { getStores } from "@/app/actions/store-actions"
import type { StoreData } from "@/types/store"

export default async function DashboardPage() {
  const user = await requireAuth()

  // Comercial só pode ver Reuniões
  if (user.role === "comercial") {
    redirect("/reunioes")
  }

  // Qualquer coisa diferente de admin não entra
  if (user.role !== "admin") {
    redirect("/login")
  }

  const stores = await getStores() as StoreData[]

  return (
    <DashboardLayout userRole={user.role}>
      <StoreCards initialStores={stores} />
    </DashboardLayout>
  )
}
