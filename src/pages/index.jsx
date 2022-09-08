import { from } from "form-data";
import React from "react";

export { default as TotalDashboard } from "./Dashboard/TotalDashboard";
export { default as Dashboard } from "./Dashboard/Dashboard";

// Gedege PA
export { default as Cluster } from "./Gedge/Cluster/Cluster";
export { default as Project } from "./Gedge/Project/Project";
export { default as PlatformProject } from "./Gedge/Project/PlatformProject";
export { default as ComponentManage } from "./Gedge/ComponentManage/ComponentManage";
export { default as Monitoring } from "./Gedge/Monitoring/Monitoring";
export { default as WorkSpace } from "./Gedge/WorkSpace/WorkSpace";
export { default as User } from "./Gedge/User/User";
export { default as Configuration } from "./Gedge/Configuration/Configuration";
export { default as Certification } from "./Gedge/Certification/Certification";
export { default as PlatformUser } from "./Gedge/PlatformUser/PlatformUser";
export { default as EdgeZoneDashboard } from "./Gedge/Platform/EdgeZone/EdgeZoneDashboard";
export { default as CloudZone } from "./Gedge/Cluster/CloudZone";
export { default as CloudZoneDashboard } from "./Gedge/Platform/CloudZone/CloudZoneDashboard";
export { default as Loadbalancer } from "./Gedge/Infra/Network/Loadbalancer/Loadbalancer";
export { default as Topology } from "./Gedge/Infra/Network/Topology/Topology";
export { default as Storage } from "./Gedge/Infra/Storage/Storage";
export { default as CreateUser } from "./Gedge/Service/Project/CreateUser/CreateUser";
export { default as PlatformControl } from "./Gedge/Service/Project/PlatformControl/PlatformControl";
export { default as Template } from "./Gedge/Service/Template/Template";

export { default as ServiceAdminDashboard } from "./Gedge/ServiceAdminDashboard/ServiceAdminDashboard";
export { default as StorageDashboard } from "./Gedge/Storage/StorageDashboard";

// Gedgd SA
export { default as ServiceProject } from "./ServiceAdmin/Project/Project";
export { default as ServiceWorkSpace } from "./ServiceAdmin/WorkSpace/WorkSpace";
export { default as ServiceWorkload } from "./ServiceAdmin/Workload/Workload";
export { default as ServiceMonitoring } from "./ServiceAdmin/Monitoring/Monitoring";
export { default as Volume } from "./Gedge/Volume/Volume";

//공통
export { default as Login } from "./Login/Login";
export { default as NotFound } from "./Gedge/NotFound/NotFound";

const Title = {
  Dashboard: "대시보드",
  TotalDashboard: "통합 대시보드",
  Platform: "플랫폼",
  Infra: "인프라",
  Service: "서비스",
  PlatformUser: "사용자",
  Monitoring: "모니터링",
  Configuration: "시스템 환경설정",
  Certification: "인증",
  Cluster: "클러스터 관리",
  WorkSpace: "워크스페이스",
  UserProject: "사용자 생성",
  PlatformProject: "플랫폼 관리",
  Component: "컴포넌트",
  Volume: "볼륨",
  User: "사용자",
  Appstore: "앱스토어",
  Workload: "워크로드",
  EdgeZone: "엣지존",
  CloudZone: "클라우드존",
  Loadbalancer: "로드밸런서",
  Topology: "토폴로지",
  NetWork: "네트워크",
  Storage: "스토리지클래스",
  StorageDashboard: "대시보드",
  Service: "서비스",
  Project: "프로젝트",
  CreateUser: "사용자 생성",
  PlatformControl: "플랫폼 관리",
  Template: "템플릿",

  ServiceAdminDashboard: "통합 대시보드",
};

export { Title };
