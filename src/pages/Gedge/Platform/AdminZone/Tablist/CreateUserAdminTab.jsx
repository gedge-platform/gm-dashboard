import React, { useState, useEffect } from "react";
import { PanelBox } from "@/components/styles/PanelBox";
import CommActionBar from "@/components/common/CommActionBar";
import { AgGrid } from "@/components/datagrids";
import { agDateColumnFilter, dateFormatter } from "@/utils/common-utils";
import { CReflexBox } from "@/layout/Common/CReflexBox";
import { CTabPanel } from "@/components/tabs";
import { useHistory } from "react-router";
import { observer } from "mobx-react";
import { projectStore } from "@/store";
import { swalUpdate, swalError } from "@/utils/swal-utils";
import Layout from "@/layout";
import { Title } from "@/pages";
import CreateProject from "@/pages/Gedge/Service/Project/CreateUser/Dialog/CreateProject";
import CreateAdminUserDetail from "../Detail/CreateUserAdminDetail";

const CreateUserAdminTab = observer(() => {
  const currentPageTitle = Title.CreateUser;
  const [open, setOpen] = useState(false);
  const [tabvalue, setTabvalue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTabvalue(newValue);
  };

  const {
    projectDetail,
    projectList,
    totalElements,
    loadAdminProjectList,
    loadProjectDetail,
    deleteProject,
    currentPage,
    totalPages,
    viewList,
    goPrevPage,
    goNextPage,
  } = projectStore;

  const [columDefs] = useState([
    {
      headerName: "프로젝트",
      field: "projectName",
      filter: true,
    },
    {
      headerName: "클러스터",
      field: "selectCluster",
      filter: true,
      cellRenderer: function ({ data: { selectCluster } }) {
        return `<span>${selectCluster.map((item) => item.clusterName)}</span>`;
      },
    },
    {
      headerName: "워크스페이스",
      field: "workspaceName",
      filter: true,
      cellRenderer: function ({ data: { workspace } }) {
        return `<span>${workspace.workspaceName}</span>`;
      },
    },
    {
      headerName: "생성날짜",
      field: "created_at",
      filter: "agDateColumnFilter",
      filterParams: agDateColumnFilter(),
      minWidth: 150,
      maxWidth: 200,
      cellRenderer: function (data) {
        return `<span>${dateFormatter(data.value)}</span>`;
      },
    },
    {
      headerName: "삭제",
      field: "delete",
      minWidth: 100,
      maxWidth: 100,
      cellRenderer: function () {
        return `<span class="state_ico_new delete"></span>`;
      },
      cellStyle: { textAlign: "center", cursor: "pointer" },
    },
  ]);

  const history = useHistory();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = ({ data: { projectName }, colDef: { field } }) => {
    if (field === "delete") {
      swalUpdate("삭제하시겠습니까?", () =>
        deleteProject(projectName, loadProjectList)
      );
      return;
    }
    loadProjectDetail(projectName);
  };

  useEffect(() => {
    loadAdminProjectList("user");
  }, []);

  return (
    <div style={{ height: 900 }}>
      <CReflexBox>
        <PanelBox>
          <CommActionBar
          // reloadFunc={loadProjectList}
          // isSearch={true}
          // isSelect={true}
          // keywordList={["이름"]}
          >
            {/* <CCreateButton onClick={handleOpen}>생성</CCreateButton> */}
          </CommActionBar>

          <div className="tabPanelContainer">
            <CTabPanel value={tabvalue} index={0}>
              <div className="grid-height2">
                <AgGrid
                  onCellClicked={handleClick}
                  rowData={viewList}
                  columnDefs={columDefs}
                  isBottom={false}
                  totalElements={totalElements}
                  totalPages={totalPages}
                  currentPage={currentPage}
                  goNextPage={goNextPage}
                  goPrevPage={goPrevPage}
                />
              </div>
            </CTabPanel>
          </div>
          <CreateProject
            reloadFunc={() => loadProjectList()}
            type={"user"}
            open={open}
            onClose={handleClose}
          />
        </PanelBox>
        <CreateAdminUserDetail project={projectDetail} />
      </CReflexBox>
    </div>
  );
});

export default CreateUserAdminTab;
