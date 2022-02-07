function dropdown(id){
    if (id != "new"){
      document.getElementsByClassName("show")[1].classList.replace("show","hide")
      document.getElementsByClassName("show")[0].classList.replace("show","hide")
    }

    if ("hide" in  document.getElementById(id).classList){
         document.getElementById(id).classList.replace("show","hide")
    }
    else {
         document.getElementById(id).classList.replace("hide","show")
    }
}
function frame(id,link){
    document.getElementById(id).src = link;
    dropdown('new')
}


function set_back(){
  document.getElementsByTagName("body")[0].background = 'data:image/svg+xml;charset=UTF-8,<svg width="1410" height="818" viewBox="0 0 1410 818" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M1167.99 308.046C1160.79 316.002 1155.96 337.903 1152.86 376.582C1150.44 406.87 1150.32 407.186 1140.04 409.244C1131.17 411.015 1129.81 412.748 1130.77 421.083C1131.6 428.282 1134.11 431.159 1140.34 432.04C1148.69 433.223 1148.77 433.606 1146.51 462.093C1143.58 498.934 1141.61 505.804 1133.33 507.968C1125.34 510.059 1124.28 523.566 1131.34 533.222C1134.83 537.989 1138.58 539.1 1145.4 537.391C1152.94 535.495 1155.71 531.54 1160.01 516.537C1164.16 502.071 1172.35 446.622 1172.52 431.82C1172.53 430.413 1177.41 426.746 1183.36 423.668C1200.03 415.046 1222.6 393.208 1227.88 380.579C1237.91 356.611 1229.76 325.313 1209.29 309.205C1197.48 299.923 1175.89 299.315 1167.99 308.046ZM1203.64 337.18C1214.17 352.714 1212.28 369.292 1198.31 383.973C1188.09 394.72 1176.5 402.384 1174.09 399.986C1172.44 398.33 1178.96 338.118 1181.78 328.999C1184.69 319.597 1194.12 323.13 1203.64 337.18Z" fill="black"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M1205.39 453.702C1192.89 461.323 1179.62 483.976 1179.62 497.681C1179.62 520.774 1210.61 534.423 1237.51 523.183C1247.06 519.19 1252.85 518.573 1257.48 521.047C1268.38 526.888 1283.36 525.001 1302.72 515.351C1321.65 505.915 1330.1 495.981 1326.71 487.14C1323.98 480.012 1312.9 480.912 1302.47 489.112C1281.88 505.311 1264.46 505.728 1264.46 490.022C1264.46 473.755 1237.5 446.723 1221.33 446.771C1218.8 446.775 1211.63 449.897 1205.39 453.702ZM1232.87 477.077C1236.7 481.697 1236.62 483.2 1232.42 485.862C1224.7 490.744 1207.9 489.868 1207.9 484.588C1207.9 472.439 1224.8 467.355 1232.87 477.077Z" fill="black"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M1258.65 360.2C1252.57 376.036 1284.21 411.403 1304.45 411.403C1319.05 411.403 1329.29 404.236 1327.52 395.261C1326.48 390.005 1323.2 388.42 1313.37 388.42C1299.35 388.42 1288.11 380.402 1279.92 364.566C1274.42 353.939 1262.03 351.392 1258.65 360.2Z" fill="black"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M938.793 699.281C934.696 703.996 929.536 707.194 927.329 706.389C917.377 702.756 915.678 710.707 917.267 753.46L918.885 796.774H928.545C937.903 796.774 938.276 796.017 940.435 772.79C943.096 744.169 952.22 715.456 958.653 715.456C966.163 715.456 971.036 735.667 968.767 757.386C967.087 773.441 967.824 778.492 972.386 782.278C980.36 788.899 987.238 782.475 990.067 765.768C992.805 749.602 1004.85 722.527 1009.31 722.527C1013.86 722.527 1017 740.583 1017 766.73C1017 790.067 1021.69 798.43 1033.5 796.156C1036.93 795.496 1042.17 790.498 1045.16 785.055C1050.06 776.108 1050.04 774.753 1044.95 770.938C1041.15 768.104 1038.67 758.764 1037.36 742.431C1036.07 726.27 1033.11 715.03 1028.51 708.845C1019.58 696.82 1003.14 694.767 994.269 704.57C987.831 711.684 987.789 711.679 978.01 701.205C965.488 687.797 949.458 687.011 938.793 699.281Z" fill="black"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M1059.15 722.256C1050.26 731.141 1048.81 735.281 1048.81 751.782C1048.81 785.972 1071.66 807.379 1108.15 807.379C1132.54 807.379 1147.8 799.706 1147.8 787.441C1147.8 778.997 1146.91 778.47 1136.31 780.629C1108 786.388 1101.03 786.69 1091.15 782.597C1078.42 777.321 1077.71 772.893 1089.13 770.026C1093.81 768.848 1101.24 764.061 1105.63 759.379C1132.81 730.442 1087.31 694.094 1059.15 722.256ZM1089.57 736.823C1092.41 741.438 1084.96 750.811 1078.43 750.811C1073.46 750.811 1071.65 739.757 1075.92 735.492C1079.47 731.931 1086.99 732.663 1089.57 736.823Z" fill="black"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M1148.26 729.24C1144.17 731.83 1144.14 737.891 1148.08 767.972C1151 790.299 1154.47 804.287 1157.34 805.393C1166.52 808.911 1172.05 802.942 1176.25 785.014C1182.69 757.479 1184.86 755.526 1189.99 772.692C1197.4 797.523 1204.13 807.638 1216.75 812.913C1229.82 818.375 1247.2 816.637 1260.13 808.576C1267.13 804.215 1269.18 804.268 1275.94 809.007C1285.44 815.661 1305.55 816.025 1317.54 809.768C1324.78 805.986 1328.38 805.962 1336.98 809.629C1364.32 821.286 1409.41 805.675 1409.41 784.555C1409.41 768.106 1389.95 762.036 1386.12 777.293C1383.51 787.709 1362.22 795.172 1349.03 790.289C1342.26 787.786 1340.85 784.607 1340.6 771.256C1340.14 746.833 1328.49 736.78 1315.59 749.681C1311.17 754.104 1310.09 759.595 1311.39 771.156C1312.95 784.947 1312.2 787.116 1304.68 790.543C1290.21 797.135 1279.66 788.739 1279.91 770.835C1280.23 747.886 1276.12 737.067 1266.13 734.559C1261.09 733.295 1255.04 734.214 1252.04 736.708C1245.8 741.883 1245.04 765.689 1250.77 776.393C1254.04 782.501 1253.56 784.708 1248.11 788.691C1244.47 791.362 1236.71 793.08 1230.88 792.506C1221.17 791.558 1219.52 789.346 1211.43 766.33C1206.57 752.505 1200.41 738.585 1197.74 735.396C1191.36 727.776 1176.31 727.991 1170.4 735.784C1166.19 741.328 1165.69 741.371 1165.59 736.162C1165.53 732.969 1162.96 729.389 1159.88 728.206C1153.11 725.612 1154.13 725.521 1148.26 729.24Z" fill="black"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M599.436 426.887C560.735 440.716 542.302 477.041 561.558 501.526C578.096 522.551 615.605 530.096 650.849 519.488C668.929 514.045 677.325 506.012 677.502 493.982C677.674 482.416 667.703 480.899 656.043 490.712C636.772 506.931 595.764 506.165 580.509 489.305C575.019 483.24 574.76 480.851 578.58 471.626C581.012 465.762 588.35 457.653 594.888 453.613C606.405 446.494 614.226 445.532 644.033 447.562C656.78 448.428 658.173 447.71 658.173 440.242C658.173 433.756 655.105 430.889 644.033 427.035C626.667 420.994 616.021 420.96 599.436 426.887Z" fill="black"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M708.21 366.323C693.295 416.673 693.596 413.921 702.633 416.788C713.207 420.149 717.558 413.892 728.793 379.181C740.831 341.996 740.649 333.623 727.811 333.623C718.367 333.623 717.443 335.164 708.21 366.323Z" fill="black"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M674.777 604.046C657.918 618.234 651.786 635.439 649.565 674.798L647.569 710.15L635.688 711.29C627.278 712.094 621.443 710.198 615.68 704.784C605.934 695.627 594.949 696.756 593.47 707.068C591.641 719.825 611.281 733.133 631.931 733.133H649.335L649.316 748.16C649.302 756.422 647.636 769.151 645.611 776.442C642.447 787.849 640.509 789.702 631.73 789.702C618.696 789.702 614.043 801.214 623.052 811.167C630.117 818.974 634.923 819.568 646.908 814.106C660.057 808.113 667.879 788.012 669.751 755.398L671.416 726.398L690.702 714.741C711.716 702.036 734.72 672.007 741.139 648.9C745.912 631.715 745.744 628.574 739.421 616.348C728.177 594.601 693.775 588.057 674.777 604.046ZM713.199 620.121C729.407 628.795 714.856 666.344 686.078 690.121L672.311 701.491L671.258 682.089C669.918 657.483 675.739 635.693 686.538 624.893C695.723 615.707 702.645 614.472 713.199 620.121Z" fill="black"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M704.595 729.688C699.478 735.772 695.285 743.407 695.271 746.663C695.261 749.918 692.873 757.137 689.967 762.704C682.419 777.18 683.319 781.393 695.295 787.673C701.125 790.732 711.067 796.022 717.39 799.425C731.003 806.754 773.902 807.286 790.698 800.325C798.922 796.922 801.348 793.681 801.348 786.113C801.348 774.466 793.972 770.583 784.901 777.458C780.823 780.545 769.287 782.446 754.195 782.517L730.017 782.628L738.868 772.11C750.39 758.415 753.63 743.115 747.666 730.607C743.817 722.541 740.333 720.568 728.433 719.692C715.849 718.773 712.656 720.114 704.595 729.688ZM722.148 757.29C716.979 762.455 716.505 762.33 716.505 755.811C716.505 745.944 724.881 737.548 726.566 745.719C727.236 748.979 725.25 754.188 722.148 757.29Z" fill="black"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M781.192 445.429C763.505 454.147 757.287 466.349 757.497 491.921C757.708 518.001 765.266 531.034 784.006 537.597C800.74 543.461 834.534 543.217 849.115 537.123C856.046 534.227 866.423 532.862 873.168 533.959C898.245 538.028 929.981 509.992 922.633 490.265C915.468 471.016 888.715 448.187 878.103 452.261C872.072 454.577 868.644 464.649 868.553 480.341C868.458 497.106 857.319 511.932 841.188 516.762C811.769 525.58 782.991 519.557 780.775 504.119C779.909 498.092 781.412 496.253 787.194 496.253C803.435 496.253 829.633 475.272 829.633 462.261C829.633 452.308 813.956 439.661 801.755 439.766C796.672 439.809 787.419 442.356 781.192 445.429ZM804.886 463.161C804.886 466.564 793.13 474.798 788.094 474.927C780.938 475.109 783.03 469.36 791.627 465.214C801.056 460.667 804.886 460.073 804.886 463.161ZM900.337 496.56C900.337 500.145 896.919 504.904 892.745 507.134C885.805 510.849 885.35 510.485 887.399 502.841C888.629 498.245 889.653 491.505 889.682 487.867C889.72 482.381 890.639 482.002 895.033 485.645C897.948 488.068 900.337 492.979 900.337 496.56Z" fill="black"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M932.392 372.063C927.131 381.895 927.682 396.357 933.44 399.737C936.097 401.293 939.38 410.158 940.74 419.445L943.219 436.329L927.964 435.357C914.006 434.467 912.623 435.132 911.728 443.222C910.991 449.871 913.336 453.514 921.201 457.938C926.949 461.174 934.302 468.938 937.533 475.195C942.554 484.903 942.789 488.819 939.127 501.897C934.048 520.035 936.269 528.074 946.364 528.074C955.737 528.074 963.3 510.748 966.248 482.534L968.417 461.791L1001.52 458.029C1038.66 453.811 1041.74 452.667 1041.74 443.136C1041.74 434.405 1029.63 427.784 1021.41 432.025C1018.01 433.782 1004.47 436.042 991.334 437.047C969.038 438.756 967.335 438.368 965.927 431.327C956.158 382.35 950.983 367.166 943.722 366.108C939.007 365.423 934.747 367.664 932.392 372.063Z" fill="black"/> <path d="M240.816 267.002C222.253 252.779 184.074 217.595 155.972 188.82C110.262 142.014 103.53 133.938 74.8372 85.6348C85.9798 78.9369 97.5178 71.5131 105.822 65.7528C120.163 55.8053 126.688 50.557 129.187 45.9287C129.679 45.0163 130.015 44.128 130.224 43.2325C130.578 35.0046 110.912 21.5585 101.143 21.5585C91.4161 21.5585 50.0783 8.25535 44.8656 3.44437C40.8974 -0.212934 30.9507 -0.643762 27.6048 2.70238L25.2603 7.65997L18.1613 22.6714C17.4854 23.9187 16.8254 25.3161 16.1765 26.8686C10.3032 40.9329 0.5 85.0503 0.5 97.4248V110.229C0.5 119.516 10.1978 122.867 19.5271 116.802C23.6437 114.126 40.1705 104.978 54.8321 97.1371C84.9636 146.837 92.1675 155.735 140.089 204.756C239.183 306.11 334.28 368.116 478.925 425.497C463.307 461.342 450.129 499.813 443.413 531.609C438.186 556.344 436.233 579.642 435.998 619.997C435.706 670.821 436.381 676.848 445.308 703.081C457.466 738.802 472.477 766.275 480.696 767.85C497.354 771.048 504.725 742.847 488.814 736.796C480.28 733.551 472.094 716.432 461.683 680.041C455.494 658.399 456.404 586.981 463.387 546.607C472.956 491.283 505.635 410.518 537.39 363.715C566.426 320.924 605.251 286.893 625.785 286.247C635.766 285.931 636.962 284.758 636.962 275.284C636.962 265.677 635.799 264.604 624.589 263.862C617.361 263.383 606.332 266.169 598.075 270.554C579.714 280.306 534.278 326.228 517.29 352.207C507.52 367.149 497.696 385.279 488.358 404.822C398.065 369.938 314.24 323.271 240.816 267.002Z" fill="black"/> </svg>'

  setTimeout(function(){ document.getElementsByTagName("body")[0].background = "" }, 5000)


}

var code = document.getElementsByClassName("code")

for ( elmt of code ){

	elmt.innerHTML = elmt.innerHTML.replaceAll("def ","<span style='color:orange'>def </span>")
  elmt.innerHTML = elmt.innerHTML.replaceAll("for ","<span style='color:orange'>for </span>")
  elmt.innerHTML = elmt.innerHTML.replaceAll("else ","<span style='color:orange'>else </span>")
  elmt.innerHTML = elmt.innerHTML.replaceAll("elif ","<span style='color:orange'>elif </span>")
  elmt.innerHTML = elmt.innerHTML.replaceAll("while ","<span style='color:orange'>while </span>")

  elmt.innerHTML = elmt.innerHTML.replaceAll("  return ","<span style='color:purple'>  return </span>")
  elmt.innerHTML = elmt.innerHTML.replaceAll("len(","<span style='color:purple'>len</span>(")
  elmt.innerHTML = elmt.innerHTML.replaceAll("print(","<span style='color:purple'>print</span>(")
  elmt.innerHTML = elmt.innerHTML.replaceAll("range(","<span style='color:purple'>range</span>(")


  elmtl = elmt.innerHTML.split("#")
  for (elmtn in elmtl){
      if(elmtn != 0){
        var bidule = elmtl[elmtn].split("\n")        
        bidule[0] = "<span style='color:lightgrey'>#"+ bidule[0] + "</span>"
        elmtl[elmtn] = bidule.join("\n")
      }
  }  
  elmt.innerHTML = elmtl.join("")

}