import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { PanelBox } from "@/components/styles/PanelBox";
import CommActionBar from "@/components/common/CommActionBar";
import { AgGrid } from "@/components/datagrids";
import { CReflexBox } from "@/layout/Common/CReflexBox";
import { CCreateButton, CDeleteButton } from "@/components/buttons";
import PutPoolSize from "../Dialog/PutPoolSize";
import FaasStore from "../../../../../store/Faas";
import { agDateColumnFilter, dateFormatter } from "@/utils/common-utils";
import { swalError } from "../../../../../utils/swal-utils";

const PoolSizeListTab = observer(() => {
  const [reRun, setReRun] = useState(false);
  const [open, setOpen] = useState(false);

  const {
    loadEnvListAPI,
    envList,
    totalElements,
    totalPages,
    currentPage,
    goNextPage,
    goPrevPage,
    DeleteEnvAPI,
    initViewList,
    envName,
    setEnvName,
    loadEnvDetailAPI,
  } = FaasStore;
  const [envListName, setEnvListName] = useState("");

  const [columDefs] = useState([
    {
      headerName: "이름",
      field: "env_name",
      filter: true,
    },
    {
      headerName: "풀 사이즈",
      field: "poolsize",
      filter: true,
      cellRenderer: function ({ data: { fission_spec } }) {
        return `<span>${fission_spec.poolsize}</span>`;
      },
    },
    {
      headerName: "네임스페이스",
      field: "namespace",
      filter: true,
      cellRenderer: function ({ data: { fission_meta } }) {
        return `<span>${fission_meta.namespace}</span>`;
      },
    },
    {
      headerName: "이미지",
      field: "image",
      filter: true,
    },
    {
      headerName: "생성일",
      field: "create_at",
      filter: "agDateColumnFilter",
      filterParams: agDateColumnFilter(),
      minWidth: 150,
      maxWidth: 200,
      cellRenderer: function ({ data: { fission_meta } }) {
        return `<span>${dateFormatter(fission_meta.creationTimestamp)}</span>`;
      },
    },
  ]);

  const handleClick = (e) => {
    setEnvListName(e.value);
    loadEnvDetailAPI(e.value);
  };

  const handleOpen = () => {
    if (envListName === "") {
      swalError("Environment를 선택해주세요!");
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const reloadData = () => {
    setReRun(true);
  };

  useEffect(() => {
    loadEnvListAPI();
    return () => {
      setReRun(false);
      initViewList();
    };
  }, [reRun]);

  return (
    <CReflexBox>
      <PanelBox>
        <CommActionBar reloadFunc={reloadData}>
          <CCreateButton onClick={handleOpen}>수정</CCreateButton>
        </CommActionBar>
        <div className="tabPanelContainer">
          <div className="grid-height2">
            <AgGrid
              onCellClicked={handleClick}
              rowData={envList}
              columnDefs={columDefs}
              totalElements={totalElements}
              isBottom={false}
              totalPages={totalPages}
              currentPage={currentPage}
              goNextPage={goNextPage}
              goPrevPage={goPrevPage}
            />
          </div>
        </div>
        <PutPoolSize
          open={open}
          onClose={handleClose}
          reloadFunc={reloadData}
        />
      </PanelBox>
    </CReflexBox>
  );
});
export default PoolSizeListTab;
