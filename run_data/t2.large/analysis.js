window.DATA = {
  "Aggregates": {
    "numRequestsMade": 758,
    "numRequestsOk": 728,
    "numRequestsFail": 0,
    "rawBytesRecv": 45217126,
    "imgBytesRecv": 32699341,
    "imgBytesSent": 4080462643,
    "totalTimeSec": 236,
    "totalCpuSeconds": 5077.854000000003,
    "bottomLine": {
      "costPerHourRetail": "0.39",
      "costPerHourReserved": "0.31",
      "costPerHourSpot": "NaN.NaN",
      "imageDataPerHourGB": 57,
      "imagesPerHour": 11105
    }
  },
  "ClientHealth": {
    "cpuUsage": {
      "type": "line",
      "data": {
        "labels": [
          0,
          30,
          60,
          90,
          120,
          150,
          180,
          210
        ],
        "datasets": [
          {
            "label": "ip-172-31-0-82",
            "data": [
              12.7382146439318,
              20.925553319919523,
              14.501510574018129,
              20.264765784114058,
              39.14373088685015,
              28.804902962206334,
              26.13981762917933,
              28.966223132036852
            ]
          },
          {
            "label": "ip-172-31-5-211",
            "data": [
              32.692307692307686,
              18.585858585858585,
              15.874620829120323,
              37.46161719549642,
              24.012158054711243,
              19.289340101522846,
              15.858585858585862,
              32.7217125382263
            ]
          },
          {
            "label": "ip-172-31-2-93",
            "data": [
              26.942482341069628,
              9.667673716012082,
              20.89249492900609,
              29.068577277379738,
              33.906882591093115,
              25.842696629213478,
              19.878296146044626,
              23.828920570264767
            ]
          }
        ]
      },
      "options": {
        "legend": {
          "display": false
        },
        "scales": {
          "xAxes": [
            {
              "scaleLabel": {
                "display": true,
                "labelString": "Time since experiment start (seconds)"
              }
            }
          ],
          "yAxes": [
            {
              "scaleLabel": {
                "display": true,
                "labelString": "CPU Utilization (%)"
              },
              "ticks": {
                "suggestedMin": 0,
                "suggestedMax": 100
              }
            }
          ]
        }
      }
    },
    "memUsage": {
      "type": "line",
      "data": {
        "labels": [
          0,
          30,
          60,
          90,
          120,
          150,
          180,
          210
        ],
        "datasets": [
          {
            "label": "ip-172-31-0-82",
            "data": [
              21.64907993233148,
              24.027314042489056,
              24.504536599378223,
              25.006276024704775,
              24.945253000869595,
              24.73820535544321,
              24.723671403495295,
              25.010386637376925
            ]
          },
          {
            "label": "ip-172-31-5-211",
            "data": [
              21.495665995103476,
              23.526112911679085,
              24.21963199250694,
              25.140458166931,
              25.24307667613902,
              24.54578953369504,
              24.27639759607456,
              24.853889740644806
            ]
          },
          {
            "label": "ip-172-31-2-93",
            "data": [
              21.650107585499523,
              23.933699732467627,
              24.41542438895009,
              24.256040276174453,
              24.13923036607453,
              24.329786624947214,
              24.450951827044996,
              24.801430493209907
            ]
          }
        ]
      },
      "options": {
        "legend": {
          "display": false
        },
        "scales": {
          "xAxes": [
            {
              "scaleLabel": {
                "display": true,
                "labelString": "Time since experiment start (seconds)"
              }
            }
          ],
          "yAxes": [
            {
              "scaleLabel": {
                "display": true,
                "labelString": "Memory Usage (%)"
              },
              "ticks": {
                "suggestedMin": 0,
                "suggestedMax": 100
              }
            }
          ]
        }
      }
    },
    "numAgents": {
      "type": "line",
      "data": {
        "labels": [
          0,
          30,
          60,
          90,
          120,
          150,
          180,
          210
        ],
        "datasets": [
          {
            "label": "Total active client agents",
            "data": [
              27,
              30,
              30,
              30,
              30,
              30,
              30,
              3
            ]
          }
        ]
      },
      "options": {
        "legend": {
          "display": false
        },
        "elements": {
          "line": {
            "stepped": true
          }
        },
        "scales": {
          "xAxes": [
            {
              "scaleLabel": {
                "display": true,
                "labelString": "Time since experiment start (seconds)"
              }
            }
          ],
          "yAxes": [
            {
              "scaleLabel": {
                "display": true,
                "labelString": "Total active client processes"
              },
              "ticks": {
                "suggestedMin": 0
              }
            }
          ]
        }
      }
    }
  },
  "RequestStats": {
    "requestsMadeStats": {
      "type": "line",
      "data": {
        "labels": [
          "0",
          "30",
          "60",
          "90",
          "120",
          "150",
          "180",
          "210"
        ],
        "datasets": [
          {
            "label": "New requests made to server",
            "data": [
              54,
              98,
              99,
              105,
              98,
              106,
              105,
              93
            ]
          }
        ]
      },
      "options": {
        "legend": {
          "display": false
        },
        "scales": {
          "xAxes": [
            {
              "scaleLabel": {
                "display": true,
                "labelString": "Time window (seconds)"
              }
            }
          ],
          "yAxes": [
            {
              "scaleLabel": {
                "display": true,
                "labelString": "New requests made to server"
              },
              "ticks": {
                "suggestedMin": 0
              }
            }
          ]
        }
      }
    },
    "requestRttStats": {
      "type": "line",
      "data": {
        "labels": [
          "0",
          "30",
          "60",
          "90",
          "120",
          "150",
          "180",
          "210"
        ],
        "datasets": [
          {
            "label": "Median request round-trip time",
            "data": [
              11.22,
              10.347,
              9.828,
              9.506,
              8.568,
              9.196,
              9.196,
              8.304
            ]
          },
          {
            "label": "95th percentile request round-trip time",
            "data": [
              11.626,
              11.626,
              11.337,
              11.337,
              11.554,
              11.554,
              11.554,
              10.66
            ]
          },
          {
            "label": "98th percentile request round-trip time",
            "data": [
              11.626,
              11.626,
              11.337,
              11.337,
              11.554,
              11.554,
              11.554,
              11.028
            ]
          }
        ]
      },
      "options": {
        "legend": {
          "display": false
        },
        "scales": {
          "xAxes": [
            {
              "scaleLabel": {
                "display": true,
                "labelString": "Time window (seconds)"
              }
            }
          ],
          "yAxes": [
            {
              "scaleLabel": {
                "display": true,
                "labelString": "Request round-trip time (seconds)"
              },
              "ticks": {
                "suggestedMin": 0
              }
            }
          ]
        }
      }
    },
    "imgBytes": {
      "type": "line",
      "data": {
        "labels": [
          "0",
          "30",
          "60",
          "90",
          "120",
          "150",
          "180",
          "210"
        ],
        "datasets": [
          {
            "label": "Total image data processed by the cluster (Gigabytes)",
            "data": [
              0.18382137641310692,
              0.6269660061225295,
              1.169619657099247,
              1.700988900847733,
              2.2386792208999395,
              2.7827175986021757,
              3.3205926958471537,
              3.80022697430104
            ]
          }
        ]
      },
      "options": {
        "legend": {
          "display": false
        },
        "scales": {
          "xAxes": [
            {
              "scaleLabel": {
                "display": true,
                "labelString": "Time since start of experiment (seconds)"
              }
            }
          ],
          "yAxes": [
            {
              "scaleLabel": {
                "display": true,
                "labelString": "Image data processed (Gigabytes)"
              },
              "ticks": {
                "suggestedMin": 0
              }
            }
          ]
        }
      }
    },
    "serverWalltimePerImage": {
      "type": "line",
      "data": {
        "labels": [
          "0",
          "30",
          "60",
          "90",
          "120",
          "150",
          "180",
          "210"
        ],
        "datasets": [
          {
            "label": "Median server walltime per image (milliseconds)",
            "data": [
              8411,
              7537,
              7301,
              7687,
              7338,
              7338,
              8038,
              7149
            ]
          },
          {
            "label": "95th percentile server walltime per image (milliseconds)",
            "data": [
              8914,
              9202,
              9202,
              9202,
              9041,
              9041,
              9041,
              8463
            ]
          },
          {
            "label": "98th percentile server walltime per image (milliseconds)",
            "data": [
              8914,
              9202,
              9202,
              9202,
              9041,
              9041,
              9041,
              8863
            ]
          },
          {
            "label": "5th percentile server walltime per image (milliseconds)",
            "data": [
              5699,
              5585,
              5585,
              5699,
              6378,
              6378,
              6378,
              5513
            ]
          }
        ]
      },
      "options": {
        "legend": {
          "display": false
        },
        "scales": {
          "xAxes": [
            {
              "scaleLabel": {
                "display": true,
                "labelString": "Time since start of experiment (seconds)"
              }
            }
          ],
          "yAxes": [
            {
              "scaleLabel": {
                "display": true,
                "labelString": "Server time per image (milliseconds)"
              },
              "ticks": {
                "suggestedMin": 0
              }
            }
          ]
        }
      }
    }
  }
};
