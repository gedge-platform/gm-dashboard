import axios from "axios";
import { makeAutoObservable, runInAction, toJS } from "mobx";
import { SERVER_URL } from "../config";
import { swalError } from "../utils/swal-utils";
import { getItem } from "../utils/sessionStorageFn";

class Job {
  currentPage = 1;
  totalPages = 1;
  resultList = {};
  viewList = null;
  adminList = [];
  pjobList = [];
  jobList = [];
  containers = [];
  jobDetailData = [];
  // jobDetailData = {
  //   containers: [
  //     {
  //       name: "",
  //       image: "",
  //     },
  //   ],
  //   ownerReferences: [
  //     {
  //       name: "",
  //       apiVersion: "",
  //       kind: "",
  //     },
  //   ],
  //   conditions: [
  //     {
  //       status: "",
  //       type: "",
  //       lastProbeTime: "",
  //     },
  //   ],
  // };
  depServicesPort = [
    {
      name: "",
      port: 0,
      protocol: "",
    },
  ];
  involvesPodList = [];
  ownerReferences = [];

  totalElements = null;
  labels = [];
  annotations = [];
  events = [
    {
      kind: "",
      name: "",
      namespace: "",
      cluster: "",
      message: "",
      reason: "",
      type: "",
      eventTime: "",
    },
  ];

  cntCheck = true;

  constructor() {
    makeAutoObservable(this);
  }

  goPrevPage = () => {
    runInAction(() => {
      if (this.currentPage > 1) {
        this.currentPage = this.currentPage - 1;
        this.setViewList(this.currentPage - 1);
        this.loadJobDetail(
          this.viewList[0].name,
          this.viewList[0].cluster,
          this.viewList[0].project
        );
      }
    });
  };

  goNextPage = () => {
    runInAction(() => {
      if (this.totalPages > this.currentPage) {
        this.currentPage = this.currentPage + 1;
        this.setViewList(this.currentPage - 1);
        this.loadJobDetail(
          this.viewList[0].name,
          this.viewList[0].cluster,
          this.viewList[0].project
        );
      }
    });
  };

  setCurrentPage = (n) => {
    runInAction(() => {
      this.currentPage = n;
    });
  };

  setTotalPages = (n) => {
    runInAction(() => {
      this.totalPages = n;
    });
  };

  convertList = (apiList, setFunc) => {
    runInAction(() => {
      let cnt = 1;
      let totalCnt = 0;
      let tempList = [];
      this.resultList = [];

      console.log(apiList)
      apiList === null
        ? (this.cntCheck = false)
        : Object.entries(apiList).map(([_, value]) => {
            this.cntCheck = true;
            tempList.push(toJS(value));
            cnt = cnt + 1;
            if (cnt > 10) {
              this.cntCheck = false;
              cnt = 1;
              this.resultList[totalCnt] = tempList;
              totalCnt = totalCnt + 1;
              tempList = [];
            }
          });

      if (this.cntCheck) {
        this.resultList[totalCnt] = tempList;
        totalCnt = totalCnt === 0 ? 1 : totalCnt + 1;
      }

      console.log(this.cntCheck)
      this.setTotalPages(totalCnt);
      this.setCurrentPage(1);
      setFunc(this.resultList);
      this.setViewList(0);
    });
  };

  setJobList = (list) => {
    runInAction(() => {
      console.log(list)
      this.pjobList = list;
    });
  };

  setViewList = (n) => {
    runInAction(() => {
      console.log(this.pjobList[n])
      this.viewList = this.pjobList[n];
      console.log(this.viewList);
    });
  };

  loadJobList = async () => {
    let { id, role } = getItem("user");
    role === "SA" ? (id = id) : (id = "");
    await axios
      .get(`${SERVER_URL}/jobs?user=${id}`)
      .then((res) => {
        runInAction(() => {
          console.log(res.data.data)
          this.jobList = res.data.data;
          res.data.data === null
            ? (this.totalElements = 0)
            : (this.totalElements = res.data.data.length);
          console.log(this.jobList)
        });
      })
      .then(() => {
        this.convertList(this.jobList, this.setJobList);
        // this.jobList.length === 0
        //   ? this.jobDetailData === null
        //   : this.loadJobDetail(
        //       this.jobList[0][0].name,
        //       this.jobList[0][0].cluster,
        //       this.jobList[0][0].project
        //     );
      });
    // this.totalElements === 0
    //   ? ((this.containers = null),
    //     (this.jobDetailData = null),
    //     (this.labels = null),
    //     (this.involvesPodList = null),
    //     (this.annotations = null),
    //     (this.involvesPodList = null),
    //     (this.ownerReferences = null))
    //   :
  };

  loadAdminJobList = async () => {
    let { id, role } = getItem("user");
    role === "SA" ? (id = id) : (id = "");
    await axios
      .get(`${SERVER_URL}/jobs?user=${id}`)
      .then((res) => {
        runInAction(() => {
          this.jobList = res.data.data;
          this.adminList = this.jobList.filter(
            (data) => data.cluster === "gm-cluster"
          );
          this.jobDetailData = this.adminList[0];
          this.totalElements = this.adminList.length;
        });
      })
      .then(() => {
        this.convertList(this.adminList, this.setJobList);
      });
    // this.loadJobDetail(
    //   this.jobList[0][0].name,
    //   this.jobList[0][0].cluster,
    //   this.jobList[0][0].project
    // );
  };

  loadJobDetail = async (name, cluster, project) => {
    await axios
      .get(`${SERVER_URL}/jobs/${name}?cluster=${cluster}&project=${project}`)
      .then(({ data: { data, involves } }) => {
        // console.log(data);
        // console.log(involves);
        runInAction(() => {
          this.jobDetailData = data;
          this.containers = data.containers;
          this.jobDetailInvolves = involves;
          this.labels = data.label;
          this.annotations = data.annotations;
          this.involvesPodList = involves.podList;
          this.ownerReferences = involves.ownerReferences;
          this.containers = data.containers;
          this.events = data.events;
        });
      });
  };

  deleteJob = async (jobName, callback) => {
    axios
      .delete(`${SERVER_URL}/jobs/${jobName}`)
      .then((res) => {
        if (res.status === 201) swalError("Job이 삭제되었습니다.", callback);
      })
      .catch((err) => swalError("삭제에 실패하였습니다."));
  };
}

const jobStore = new Job();
export default jobStore;
