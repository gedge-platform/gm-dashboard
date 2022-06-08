import React, { useState, useEffect } from "react";
import { PanelBox } from "@/components/styles/PanelBox";
import CommActionBar from "@/components/common/CommActionBar";
import { AgGrid } from "@/components/datagrids";
import { agDateColumnFilter, dateFormatter } from "@/utils/common-utils";
import { CReflexBox } from "@/layout/Common/CReflexBox";
import { CCreateButton } from "@/components/buttons";
import { CTabPanel } from "@/components/tabs";
import { useHistory } from "react-router";
import { observer } from "mobx-react";
import workspacesStore from "../../../../store/WorkSpace";
import CreateWorkSpace from "../Dialog/CreateWorkSpace";
import clusterStore from "../../../../store/Cluster";
import { swalUpdate } from "../../../../utils/swal-utils";
import Detail from "../Detail";

const APIListTab = observer(() => {
  const [open, setOpen] = useState(false);
  const [tabvalue, setTabvalue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTabvalue(newValue);
  };

  const { 
    workSpaceList, 
    loadWorkSpaceList, 
    totalElements, 
    deleteWorkspace,
    workSpaceDetail,
    loadWorkspaceDetail, 
  } = workspacesStore;

  const [columDefs] = useState([
    {
      headerName: "이름",
      field: "workspaceName",
      filter: true,
    },
    {
      headerName: "클러스터",
      field: "selectCluster",
      filter: true,
    },
    {
      headerName: "OWNER",
      field: "workspaceOwner",
      filter: true,
    },
    {
      headerName: "CREATOR",
      field: "workspaceCreator",
      filter: true,
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
  const handleClick = ({ data: { workspaceName }, colDef: { field } }) => {
    if (field === "delete") {
      swalUpdate("삭제하시겠습니까?", () =>
        deleteWorkspace(workspaceName, loadWorkSpaceList)
      );
    }
    loadWorkspaceDetail(workspaceName);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    loadWorkSpaceList();
  }, []);

  return (
    <>
      <CReflexBox>
        <PanelBox>
          <CommActionBar
            reloadFunc={loadWorkSpaceList}
            isSearch={true}
            isSelect={true}
            keywordList={["이름"]}
          >
            <CCreateButton onClick={handleOpen}>생성</CCreateButton>
            {/* <CSelectButton items={[]}>{"All Cluster"}</CSelectButton> */}
          </CommActionBar>

          <div className="tabPanelContainer">
            <CTabPanel value={tabvalue} index={0}>
              <div className="grid-height2">
                <AgGrid
                  rowData={workSpaceList}
                  columnDefs={columDefs}
                  isBottom={true}
                  totalElements={totalElements}
                  onCellClicked={handleClick}
                />
              </div>
            </CTabPanel>
          </div>
          <CreateWorkSpace
            reloadFunc={loadWorkSpaceList}
            type={"user"}
            open={open}
            onClose={handleClose}
          />
        </PanelBox>
        <Detail workSpace={workSpaceDetail} />
      </CReflexBox>
    </>
  );
});
export default APIListTab;
