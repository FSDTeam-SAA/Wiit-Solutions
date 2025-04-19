// /app/dashboard/page.tsx

// import ProtectedRoute from "../components/ProtectedRoute";
import BannerEditor from "./_components/bannereditor";

export default async function Dashboard() {
  // const session = await getServerSession(authOptions);




  // if (!session) {
  //   redirect("/");
  // }

  return (
    // <ProtectedRoute>
    <div >
      <BannerEditor />
    </div>
    // </ProtectedRoute>
  );
}

