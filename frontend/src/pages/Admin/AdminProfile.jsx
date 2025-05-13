import MainLayout from "../../components/layouts/MainLayout";
import AdminProfile from "../../components/forms/ProfileManage";

const AdminProfilePage = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "My Profile", href: "/admin/profile" },
  ];

  return (
    <MainLayout breadcrumbs={breadcrumbItems} title="My Profile">
      <div className="flex items-center flex-col w-full h-full min-h-[400px]">
        <AdminProfile />
      </div>
    </MainLayout>
  );
};

export default AdminProfilePage;
