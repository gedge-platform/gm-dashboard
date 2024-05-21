import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { GSLINK_URL } from "../config";
import { getItem } from "../utils/sessionStorageFn";
import { swalError } from "../utils/swal-utils";

class GsLink {
  totalElements = 0;
  currentPage = 1;
  totalPages = 1;
  resultList = {};
  viewList = null;
  gsLinkList = [];

  constructor() {
    makeAutoObservable(this);
  }

  initViewList = () => {
    runInAction(() => {
      this.viewList = null;
      this.currentPage = 1;
    });
  };

  gsLinkInfo = {
    user_name: "",
    workspace_name: "",
    project_name: "",
    namespace_name: "",
    status: "active",
    source_type: "pod",
  };

  parameters = {
    source_cluster: "",
    source_name: "",
    source_service: "",
    target_cluster: "",
  };

  setGsLinkInfo = (name, value) => {
    runInAction(() => {
      this.gsLinkInfo[name] = value;
    });
  };

  setParameters = (name, value) => {
    runInAction(() => {
      this.parameters[name] = value;
    });
  };

  initGsLinkInfo = () => {
    this.gsLinkInfo = {
      user_name: "",
      workspace_name: "",
      project_name: "",
      namespace_name: "",
      status: "active",
      source_type: "pod",
      parameters: {
        source_cluster: "",
        source_name: "",
        source_service: "",
        target_cluster: "",
      },
    };
  };

  initParameters = () => {
    this.parameters = {
      source_cluster: "",
      source_name: "",
      source_service: "",
      target_cluster: "",
    };
  };

  nodeList = [];
  setLodeList = (value) => {
    runInAction(() => {
      this.nodeList = value;
    });
  };

  goPrevPage = () => {
    runInAction(() => {
      if (this.currentPage > 1) {
        this.currentPage = this.currentPage - 1;
        this.paginationList();
      }
    });
  };

  goNextPage = () => {
    runInAction(() => {
      if (this.totalPages > this.currentPage) {
        this.currentPage = this.currentPage + 1;
        this.paginationList();
      }
    });
  };

  paginationList = () => {
    runInAction(() => {
      if (this.gsLinkList !== null) {
        this.viewList = this.gsLinkList.slice(
          (this.currentPage - 1) * 20,
          this.currentPage * 20
        );
      }
    });
  };

  loadGsLinkList = async () => {
    await axios
      .get(`${GSLINK_URL}`)
      .then((res) => {
        runInAction(() => {
          if (res.data !== null) {
            this.gsLinkList = res.data.sort((a, b) => {
              return new Date(b.request_time) - new Date(a.request_time);
            });

            // this.totalPages = Math.ceil(this.gsLinkList.length / 20);
            this.totalElements = this.gsLinkList.length;
          } else {
            this.gsLinkList = [];
          }
        });
      })
      .then(() => {
        this.paginationList();
      })
      .catch((error) => {
        this.gsLinkList = [];
        this.paginationList();
      });
  };

  postGsLink = async (data, callback) => {
    let { id } = getItem("user");

    const body = {
      user_name: id,
      // workspace_name: this.gsLinkInfo.workspace_name,
      workspace_name: "ws1",
      project_name: "user1",
      namespace_name: "p1-6f9dbcee-bb90-4b55-ad0a-d6d3000e2ec7",
      status: "active",
      source_type: "pod",
      parameters: {
        source_cluster: this.parameters.source_cluster,
        source_name: "nginx-glink",
        source_service: "nginx-glink-service",
        target_cluster: this.parameters.target_cluster,
        origin_source_cluster: this.parameters.source_cluster,
      },
    };
    console.log("body ???", body);
    await axios
      .post(`${GSLINK_URL}`, body)
      .then((res) => {
        console.log("res ?? ", res);
        runInAction(() => {
          if (res.status === 200) {
            swalError("이동에 성공하였습니다.", callback);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteGsLink = async (requestId) => {
    await axios
      .delete(`${GSLINK_URL}/${requestId}`)
      .then((res) => {
        runInAction(() => {
          if (res.status === 200) {
            swalError("삭제되었습니다.", callback);
          }
          if (res.status === 400) {
            swalError("삭제에 실패했습니다.", callback);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

const gsLinkStore = new GsLink();
export default gsLinkStore;
