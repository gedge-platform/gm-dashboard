import axios from "axios";
import { makeAutoObservable, runInAction, toJS } from "mobx";
import {
  BASIC_AUTH,
  LOCAL_VOLUME_URL,
  SERVER_URL2,
  BEARER_TOKEN,
} from "../config";
import { getItem } from "../utils/sessionStorageFn";
import { setItem } from "../utils/sessionStorageFn";
import { swalError } from "../utils/swal-utils";

class Volume {
  pVolumesList = [];
  pVolume = {};
  viewList = [];
  currentPage = 1;
  totalPages = 1;
  totalElements = 0;
  pVolumeYamlFile = "";
  pVolumeMetadata = {};
  storageClasses = [];
  storageClass = {};
  scYamlFile = "";
  scParameters = {};
  scLables = {};
  scAnnotations = {};
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
  label = {};
  content = ""; //초기화를 잘 합시다

  constructor() {
    makeAutoObservable(this);
  }

  goPrevPage = () => {
    runInAction(() => {
      if (this.currentPage > 1) {
        this.currentPage = this.currentPage - 1;
        this.setViewList(this.currentPage - 1);
        this.loadPVolume(this.viewList[0].name, this.viewList[0].cluster);
      }
    });
  };

  goNextPage = () => {
    runInAction(() => {
      if (this.totalPages > this.currentPage) {
        this.currentPage = this.currentPage + 1;
        this.setViewList(this.currentPage - 1);
        this.loadPVolume(this.viewList[0].name, this.viewList[0].cluster);
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

      Object.entries(apiList).map(([_, value]) => {
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
      setFunc(this.resultList);
      this.setViewList(0);
    });
  };

  setPVolumesList = (list) => {
    runInAction(() => {
      this.pVolumesList = list;
    });
  };

  setViewList = (n) => {
    runInAction(() => {
      this.viewList = this.pVolumesList[n];
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

  setCluster = (clusterName) => {
    runInAction(() => {
      this.cluster = clusterName;
    });
  };

  setProject = (value) => {
    runInAction(() => {
      this.project = value;
    });
  };

  setSelectClusters = (selectClusters) => {
    runInAction(() => {
      this.selectClusters = selectClusters;
    });
  };

  clearAll = () => {
    runInAction(() => {
      // this.volumeName = "";
      this.content = "";
      this.volumeCapacity = 0;
      this.projectList = "";
    });
  };

  loadVolumeYaml = async (name, clusterName, projectName, kind) => {
    await axios
      .get(
        `${SERVER_URL2}/view/${name}?cluster=${clusterName}&project=${projectName}&kind=${kind}`
      )
      .then((res) => {
        runInAction(() => {
          const YAML = require("json-to-pretty-yaml");
          this.getYamlFile = YAML.stringify(res.data.data);
        });
      });
  };

  // 볼륨 관리
  loadPVolumes = async () => {
    await axios
      .get(`${SERVER_URL2}/pvs`)
      .then((res) => {
        runInAction(() => {
          this.pVolumesList = res.data.data;
          this.totalElements = this.pVolumesList.length;
        });
      })
      .then(() => {
        this.convertList(this.pVolumesList, this.setPVolumesList);
      })
      .then(() => {
        this.loadPVolume(this.viewList[0].name, this.viewList[0].cluster);
      });
  };

  loadPVolume = async (name, cluster) => {
    await axios
      .get(`${SERVER_URL2}/pvs/${name}?cluster=${cluster}`)
      .then(({ data: { data } }) => {
        runInAction(() => {
          this.pVolume = data;
          this.pVolumeYamlFile = "";
          this.pVolumeMetadata = {};
          this.events = data.events;
          Object.entries(this.pVolume?.annotations).forEach(([key, value]) => {
            try {
              const YAML = require("json-to-pretty-yaml");
              this.pVolumeYamlFile = YAML.stringify(JSON.parse(value));
            } catch (e) {
              if (key && value) {
                this.pVolumeMetadata[key] = value;
              }
            }
          });
        });
      });
  };

  createVolume = (template, callback) => {
    const YAML = require("yamljs");
    axios
      .post(
        `http://192.168.160.235:8011/gmcapi/v2/pvcs?cluster=${this.selectClusters}&project=${this.project}`,

        YAML.parse(this.content)
      )
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          swalError("Volume이 생성되었습니다!", callback);
        }
      })
      .catch((err) => {
        swalError("프로젝트 생성에 실패하였습니다.", callback);
        console.error(err);
      });
  };
}

const volumeStore = new Volume();
export default volumeStore;
