import axios from "axios";
import { makeAutoObservable, runInAction, toJS } from "mobx";
import { SERVER_URL } from "../config";
import { swalError } from "../utils/swal-utils";
import { getItem } from "../utils/sessionStorageFn";

class Claim {
  viewList = [];
  currentPage = 1;
  totalPages = 1;
  totalElements = 0;
  pvClaim = {};
  pvClaimList = [];
  pvClaimYamlFile = "";
  pvClaimAnnotations = {};
  pvClaimLables = {};
  pvClaimEvents = [];
  getYamlFile = "";
  resultList = {};
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
  labels = [];
  annotations = [];
  claimName = "";
  project = "";
  clusterName = "";
  cluster = "";
  selectClusters = "";
  storageClass = "";
  accessMode = "";
  volumeCapacity = "";
  content = ""; //초기화를 잘 합시다2

  labelInput = [];
  labelKey = "";
  labelValue = "";

  labelInputKey = "";
  labelInputValue = "";

  annotationInput = [];
  annotationKey = "";
  annotationValue = "";
  pvClaimListInDeployment = [];
  checkPVCInDeployment = "";

  setCheckPVCInDeployment = (value) => {
    runInAction(() => {
      this.checkPVCInDeployment = value;
    });
  };

  setTemplate = (template) => {
    runInAction(() => {
      delete template.metadata.labels[""];
      delete template.metadata.annotations[""];
    });
  };

  setTemplateLabel = () => {
    runInAction(() => {
      this.labels.map((data) => {
        this.labelInput[data.labelKey] = data.labelValue;
      });
    });
  };

  setTemplateAnnotation = () => {
    runInAction(() => {
      this.annotations.map((data) => {
        this.annotationInput[data.annotationKey] = data.annotationValue;
      });
    });
  };

  setLabelInput = (value) => {
    runInAction(() => {
      this.labelInput = value;
    });
  };

  setLabels = (value) => {
    runInAction(() => {
      this.labels = value;
    });
  };

  setClearLA = () => {
    runInAction(() => {
      this.labelKey = "";
      this.labelValue = "";
      this.annotationKey = "";
      this.annotationValue = "";
      this.labels = [];
      this.annotations = [];
    });
  };

  inputLabelKey = "";

  setInputLabelKey = (value) => {
    runInAction(() => {
      this.labelKey = value;
    });
  };

  setInputLabelValue = (value) => {
    runInAction(() => {
      this.labelValue = value;
    });
  };

  setAnnotations = (value) => {
    runInAction(() => {
      this.annotations = value;
    });
  };

  setInputAnnotationKey = (value) => {
    runInAction(() => {
      this.annotationKey = value;
    });
  };

  setInputAnnotationValue = (value) => {
    runInAction(() => {
      this.annotationValue = value;
    });
  };

  setAnnotationInput = (value) => {
    runInAction(() => {
      this.annotationInput = value;
    });
  };

  constructor() {
    makeAutoObservable(this);
  }

  goPrevPage = () => {
    runInAction(() => {
      if (this.currentPage > 1) {
        this.currentPage = this.currentPage - 1;
        this.setViewList(this.currentPage - 1);
        this.loadPVClaim(
          this.viewList[0].name,
          this.viewList[0].clusterName,
          this.viewList[0].namespace
        );
      }
    });
  };

  goNextPage = () => {
    runInAction(() => {
      if (this.totalPages > this.currentPage) {
        this.currentPage = this.currentPage + 1;
        this.setViewList(this.currentPage - 1);
        this.loadPVClaim(
          this.viewList[0].name,
          this.viewList[0].clusterName,
          this.viewList[0].namespace
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
      let cntCheck = true;
      this.resultList = {};

      apiList === null
        ? (cntCheck = false)
        : Object.entries(apiList).map(([_, value]) => {
            cntCheck = true;
            tempList.push(toJS(value));
            cnt = cnt + 1;
            if (cnt > 10) {
              cntCheck = false;
              cnt = 1;
              this.resultList[totalCnt] = tempList;
              totalCnt = totalCnt + 1;
              tempList = [];
            }
          });

      if (cntCheck) {
        this.resultList[totalCnt] = tempList;
        totalCnt = totalCnt === 0 ? 1 : totalCnt + 1;
      }

      this.setTotalPages(totalCnt);
      this.setCurrentPage(1);
      setFunc(this.resultList);
      this.setViewList(0);
    });
  };

  setPvClaimList = (list) => {
    runInAction(() => {
      this.pvClaimList = list;
    });
  };

  setViewList = (n) => {
    runInAction(() => {
      this.viewList = this.pvClaimList[n];
    });
  };

  setMetricsLastTime = (time) => {
    runInAction(() => {
      this.lastTime = time;
    });
  };

  setVolumeName = (value) => {
    runInAction(() => {
      this.volumeName = value;
    });
  };

  setClaimName = (value) => {
    runInAction(() => {
      this.claimName = value;
    });
  };

  setAccessMode = (name) => {
    runInAction(() => {
      this.accessMode = name;
    });
  };

  setVolumeCapacity = (value) => {
    runInAction(() => {
      this.volumeCapacity = value;
    });
  };

  setContent = (content) => {
    runInAction(() => {
      this.content = content;
    });
  };

  setResponseData = (data) => {
    runInAction(() => {
      this.responseData = data;
    });
  };

  setCluster = (cluster) => {
    runInAction(() => {
      this.cluster = cluster;
    });
  };

  setProject = (value) => {
    runInAction(() => {
      this.project = value;
    });
  };

  setSelectClusters = (value) => {
    runInAction(() => {
      this.selectClusters = value;
    });
  };

  clearAll = () => {
    runInAction(() => {
      this.content = "";
      this.volumeCapacity = 0;
      this.projectList = "";
    });
  };

  closeTab = () => {
    window.close();
  };

  loadClaimYaml = async (name, clusterName, projectName, kind) => {
    await axios
      .get(
        `${SERVER_URL}/view/${name}?cluster=${clusterName}&project=${projectName}&kind=${kind}`
      )
      .then((res) => {
        runInAction(() => {
          const YAML = require("json-to-pretty-yaml");
          this.getYamlFile = YAML.stringify(res.data.data);
        });
      });
  };

  // 클레임 관리
  loadPVClaims = async () => {
    let { id, role } = getItem("user");
    role === "SA" ? (id = id) : (id = "");
    await axios
      .get(`${SERVER_URL}/pvcs?user=${id}`)
      .then((res) => {
        runInAction(() => {
          this.pvClaimList = res.data.data;
          this.pvClaimListInDeployment = res.data.data;
          this.totalElements = res.data.data.length;
        });
      })
      .then(() => {
        this.convertList(this.pvClaimList, this.setPvClaimList);
      })
      .then(() => {
        this.loadPVClaim(
          this.viewList[0].name,
          this.viewList[0].clusterName,
          this.viewList[0].namespace
        );
      });
  };

  loadPVClaim = async (name, clusterName, namespace) => {
    await axios
      .get(
        `${SERVER_URL}/pvcs/${name}?cluster=${clusterName}&project=${namespace}`
      )
      .then(({ data: { data } }) => {
        runInAction(() => {
          this.pvClaim = data;
          this.pvClaimYamlFile = "";
          this.pvClaimAnnotations = {};
          this.pvClaimLables = {};
          this.events = data.events;
          this.label = data.label;
          Object.entries(this.pvClaim?.label).map(([key, value]) => {
            this.pvClaimLables[key] = value;
          });

          Object.entries(this.pvClaim?.annotations).forEach(([key, value]) => {
            try {
              const YAML = require("json-to-pretty-yaml");
              this.pvClaimYamlFile = YAML.stringify(JSON.parse(value));
            } catch (e) {
              if (key && value) {
                this.pvClaimAnnotations[key] = value;
              }
            }
          });
        });
      });
  };

  createVolumeClaim = (template, callback) => {
    const YAML = require("yamljs");
    axios
      .post(
        `${SERVER_URL}/pvcs?cluster=${this.selectClusters}&project=${this.project}`,

        YAML.parse(this.content)
      )
      .then((res) => {
        if (res.status === 201) {
          swalError("Volume이 생성되었습니다!", callback);
        }
      })
      .catch((err) => {
        swalError("Volume 생성에 실패하였습니다.", callback);
        console.error(err);
      });
  };

  deletePvClaim = async (claimName, callback) => {
    axios
      .delete(`${SERVER_URL}/pvcs/${claimName}`)
      .then((res) => {
        if (res.status === 201) swalError("Claim이 삭제되었습니다.", callback);
      })
      .catch((err) => swalError("삭제에 실패하였습니다."));
  };
}

const claimStore = new Claim();
export default claimStore;
