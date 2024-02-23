import React, { useState, useEffect } from "react";
import { PanelBox } from "@/components/styles/PanelBox";
import CommActionBar from "@/components/common/CommActionBar";
import { AgGrid } from "@/components/datagrids";
import { agDateColumnFilter, dateFormatter } from "@/utils/common-utils";
import { CReflexBox } from "@/layout/Common/CReflexBox";
import { CCreateButton, CSelectButton } from "@/components/buttons";
import { CTabs, CTab, CTabPanel } from "@/components/tabs";
import { useHistory } from "react-router";
import { observer } from "mobx-react";
import { jobStore } from "@/store";
import JobAdminDetail from "../Detail/JobAdminDetail";

const JobAdminTab = observer(() => {
  const [tabvalue, setTabvalue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTabvalue(newValue);
  };

  const {
    viewList,
    jobList,
    jobDetail,
    totalElements,
    loadAdminJobList,
    loadJobDetail,
    currentPage,
    totalPages,
    goPrevPage,
    goNextPage,
    initViewList,
    adminJobDetailData,
  } = jobStore;

  const [columDefs] = useState([
    {
      headerName: "잡 이름",
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
      headerName: "상태",
      field: "completions",
      filter: true,
      // cellRenderer: ({ value }) => {
      //   if (value === 1) {
      //     return drawStatus("True");
      //   } else {
      //     return drawStatus("False");
      //   }
      // },
    },
    {
      headerName: "지속시간(초)",
      field: "duration",
      filter: true,
    },
    {
      headerName: "완료날짜",
      field: "created_at",
      filter: "agDateColumnFilter",
      filterParams: agDateColumnFilter(),
      minWidth: 150,
      maxWidth: 200,
      cellRenderer: function (data) {
        return `<span>${dateFormatter(data.value)}</span>`;
      },
    },
  ]);

  const handleClick = (e) => {
    const fieldName = e.colDef.field;
    loadJobDetail(e.data.name, e.data.cluster, e.data.project);
  };

  const history = useHistory();

  useEffect(() => {
    loadAdminJobList();
    return () => {
      initViewList();
    };
  }, []);

  return (
    <div style={{ height: 900 }}>
      <CReflexBox>
        <PanelBox>
          <CommActionBar reloadFunc={loadAdminJobList}>
            {/* <CCreateButton>생성</CCreateButton> */}
          </CommActionBar>

          <div className="tabPanelContainer">
            <CTabPanel value={tabvalue} index={0}>
              <div className="grid-height2">
                <AgGrid
                  onCellClicked={handleClick}
                  rowData={jobList}
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
        </PanelBox>
        <JobAdminDetail job={adminJobDetailData} />
      </CReflexBox>
    </div>
  );
});
export default JobAdminTab;
