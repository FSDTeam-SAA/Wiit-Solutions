// /app/dashboard/page.tsx

import ProtectedRoute from "../components/ProtectedRoute";

export default async function Dashboard() {
  // const session = await getServerSession(authOptions);




  // if (!session) {
  //   redirect("/");
  // }

  return (
    <ProtectedRoute>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p>Welcome,</p>
      </div>
    </ProtectedRoute>
  );
}

