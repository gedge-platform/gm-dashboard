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
import Detail from "../StatefulDetail";
import statefulSetStore from "../../../../../../store/StatefulSet";

const StatefulSetListTab = observer(() => {
  const [tabvalue, setTabvalue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTabvalue(newValue);
  };

  const {
    statefulSetList,
    statefulDetail,
    totalElements,
    loadStatefulSetList,
    loadStatefulSetDetail,
    currentPage,
    totalPages,
    viewList,
    goPrevPage,
    goNextPage,
  } = statefulSetStore;

  const [columDefs] = useState([
    {
      headerName: "스테이트풀셋 이름",
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
      field: "ready",
      filter: true,
    },
    {
      headerName: "생성날짜",
      field: "createAt",
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
    loadStatefulSetDetail(e.data.name, e.data.cluster, e.data.project);
  };

  const history = useHistory();

  useEffect(() => {
    loadStatefulSetList();
  }, []);

  return (
    <>
      <CReflexBox>
        <PanelBox>
          <CommActionBar
            reloadFunc={loadStatefulSetList}
            isSearch={true}
            isSelect={true}
            keywordList={["이름"]}
          >
            {/* <CCreateButton>생성</CCreateButton> */}
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
        </PanelBox>
        <Detail statefulSet={statefulDetail} />
      </CReflexBox>
    </>
  );
});
export default StatefulSetListTab;
