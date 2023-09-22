import React, { useState, useEffect } from "react";
import { PanelBox } from "@/components/styles/PanelBox";
import CommActionBar from "@/components/common/CommActionBar";
import { AgGrid } from "@/components/datagrids";
import { CReflexBox } from "@/layout/Common/CReflexBox";
import { CCreateButton, CSelectButton } from "@/components/buttons";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";
import { useHistory } from "react-router";
import { observer } from "mobx-react";
import Detail from "../Detail";
import { deploymentStore } from "@/store";
import CreateDeployment from "../Dialog/CreateDeployment";
import { agDateColumnFilter, dateFormatter } from "@/utils/common-utils";
import { filterParams } from "../../../../../../utils/common-utils";
import TamplateCreate from "../Dialog/TamplateCreate";

const DeploymentListTab = observer(() => {
  const [open, setOpen] = useState(false);
  const [tamplateOpen, setTemplateOpen] = useState(false);
  const [tabvalue, setTabvalue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTabvalue(newValue);
  };

  const {
    deploymentList,
    deploymentDetail,
    totalElements,
    loadDeploymentList,
    loadDeploymentDetail,
    setWorkspace,
    currentPage,
    totalPages,
    viewList,
    initViewList,
    goPrevPage,
    goNextPage,
  } = deploymentStore;

  const [columDefs] = useState([
    {
      headerName: "디플로이먼트 이름",
      field: "name",
      filter: true,
    },
    {
      headerName: "클러스터",
      field: "cluster",
      filter: true,
    },
    {
      headerName: "프로젝트",
      field: "project",
      filter: true,
    },
    {
      headerName: "워크스페이스",
      field: "workspace",
      filter: true,
      cellRenderer: function (data) {
        return `<span>${data.value ? data.value : "-"}</span>`;
      },
    },
    {
      headerName: "상태",
      field: "ready",
      filter: true,
      // cellRenderer: function ({ value }) {
      //   return drawStatus(value.toLowerCase());
      // },
    },
    {
      headerName: "생성일",
      field: "createAt",
      filter: "agDateColumnFilter",
      filterParams: filterParams,
      minWidth: 150,
      maxWidth: 200,
      cellRenderer: function (data) {
        return `<span>${dateFormatter(data.value)}</span>`;
      },
    },
  ]);

  const handleClick = (e) => {
    const fieldName = e.colDef.field;
    loadDeploymentDetail(e.data.name, e.data.cluster, e.data.project);
  };

  const history = useHistory();

  useEffect(() => {
    loadDeploymentList();
    return () => {
      initViewList();
    };
  }, []);

  const handleCreateOpen = () => {
    setWorkspace("");
    setOpen(true);
  };

  const handleTamplateCreateOpen = () => {
    setTemplateOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTemplateOpen(false);
  };

  return (
    <div style={{ height: 900 }}>
      <CReflexBox>
        <PanelBox>
          <CommActionBar reloadFunc={loadDeploymentList}>
            <CCreateButton onClick={handleCreateOpen}>생성</CCreateButton>{" "}
            &nbsp;
            <CCreateButton onClick={handleTamplateCreateOpen}>
              템플릿
            </CCreateButton>
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
          <CreateDeployment
            open={open}
            onClose={handleClose}
            reloadFunc={loadDeploymentList}
          />
          <TamplateCreate
            open={tamplateOpen}
            onClose={handleClose}
            reloadFunc={loadDeploymentList}
          />
        </PanelBox>
        <Detail deployment={deploymentDetail} />
      </CReflexBox>
    </div>
  );
});
export default DeploymentListTab;
