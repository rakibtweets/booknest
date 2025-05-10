import { Suspense } from "react";

import DashboardContent from "@/components/admin/sections/DashboardContent";
import DashboardSkeleton from "@/components/skeletons/DashboardSkeleton";

const DashboardPage = () => {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
};
export default DashboardPage;
