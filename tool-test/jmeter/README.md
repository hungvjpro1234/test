# JMeter Tooling - Todo List App

## Muc dich

Bo khung de viet va chay performance test tu dong bang JMeter cho cac API uu tien trong SRS.

## Cau truc

- `config/env.sample.properties`: bien moi truong de chay test
- `test-data/perf_endpoints.csv`: mapping 20 test case va endpoint
- `test-data/perf_users.csv`: danh sach user test cho cac Thread Group thong thuong
- `test-data/perf_admin_users.csv`: danh sach admin user cho TG-Admin
- `test-data/perf_ids.csv`: danh sach `groupId/taskId/conversationId/notificationId`
- `TodoApp_Perf.jmx`: test plan JMeter da trien khai theo `test-docs/performance`
- `results/`: output `.jtl` va HTML report
- `run-jmeter.ps1`: script chay non-GUI

## Chuan bi

1. Cai JMeter (khuyen nghi >= 5.6).
2. Copy `config/env.sample.properties` thanh `config/env.local.properties`.
3. Dien gia tri that: `host`, `port`, thong tin user/admin va cac file CSV neu ban doi duong dan.
4. Cap nhat `test-data/perf_users.csv` voi du user hop le cho tai khoan test.
5. Cap nhat `test-data/perf_admin_users.csv` voi it nhat 1 admin account hop le.
6. Cap nhat `test-data/perf_ids.csv` voi cac ObjectId hop le trong DB.
7. Giam `tg.*` trong `env.local.properties` neu muon smoke test nhanh tren GUI truoc.

## Chay test (Windows PowerShell)

```powershell
./run-jmeter.ps1 -JmxFile ".\TodoApp_Perf.jmx" -EnvFile ".\config\env.local.properties"
```

## Goi y test tren GUI

1. Mo `TodoApp_Perf.jmx` trong JMeter GUI.
2. Mo file `config/env.local.properties` va chinh truoc khi Run.
3. De smoke test, nen set nho truoc:

```properties
tg.auth.threads=2
tg.auth.ramp=5
tg.auth.duration=30

tg.taskread.threads=2
tg.taskread.ramp=5
tg.taskread.duration=30

tg.taskwrite.threads=1
tg.taskwrite.ramp=3
tg.taskwrite.duration=30

tg.group.threads=1
tg.group.ramp=3
tg.group.duration=30

tg.notification.threads=1
tg.notification.ramp=3
tg.notification.duration=30

tg.chat.threads=1
tg.chat.ramp=3
tg.chat.duration=30

tg.admin.threads=1
tg.admin.ramp=3
tg.admin.duration=30
```

4. Trong GUI, add listener de debug:
   - `View Results Tree`
   - `Summary Report`
   - `Aggregate Report`
5. Run mot TG truoc neu muon debug nho: chuot phai vao TG can test, chon `Start` neu UI cua ban co muc nay; neu khong thi tam disable cac TG khac.
6. Khi tat ca request xanh va data dung, moi tang dan `tg.*` len muc tai that.

## Output

- JTL: `results\perf-result-<timestamp>.jtl`
- HTML: `results\html-<timestamp>\index.html`

## Luu y khi viet script

- Tach Thread Group theo domain (auth/task/chat/notif/admin).
- TG-Auth do login/refresh lien tuc de cover `PERF-01` va `PERF-02`.
- Cac TG con lai login 1 lan/thread trong `Once Only Controller`, sau do luu token vao JMeter variable.
- Dung CSV cho dynamic IDs (`taskId`, `groupId`, `conversationId`, `notificationId`) va user data.
- Dat Uniform Random Timer (200-1000ms) de mo phong think-time.
- Bat Summary Report + Backend Listener neu can day metric len Grafana/Influx.
- `PERF-08` tao task moi va `PERF-09` uu tien update lai task vua tao; neu create fail thi fallback sang `taskId` trong CSV/property.
- `PERF-14` se co gang extract `notificationId` tu danh sach notification; neu khong co data thi fallback sang `notificationId` trong CSV/property.
- Nen cung cap so dong trong `perf_users.csv` >= so thread muc tieu cua TG quan trong. Neu qua it user, refresh token co the bi rotate xung dot giua cac thread.
- File mau `perf_users.csv` hien tai chi la placeholder. Muon chay tai lon, ban can thay bang danh sach tai khoan that va du so luong.
