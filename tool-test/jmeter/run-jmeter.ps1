param(
    [string]$JmxFile = ".\TodoApp_Perf.jmx",
    [string]$EnvFile = ".\config\env.local.properties",
    [string]$JMeterBin = ""
)

if (-not (Test-Path $JmxFile)) {
    Write-Error "JMX file not found: $JmxFile"
    exit 1
}

if (-not (Test-Path $EnvFile)) {
    Write-Error "Env file not found: $EnvFile"
    exit 1
}

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$resultFile = ".\results\perf-result-$timestamp.jtl"
$reportDir = ".\results\html-$timestamp"

if (-not $JMeterBin) {
    $candidates = @(
        "jmeter",
        "D:\apache-jmeter-5.6.3\apache-jmeter-5.6.3\bin\jmeter.bat",
        "C:\apache-jmeter-5.6.3\bin\jmeter.bat",
        "C:\apache-jmeter-5.6.3\apache-jmeter-5.6.3\bin\jmeter.bat"
    )

    foreach ($candidate in $candidates) {
        if ($candidate -eq "jmeter") {
            $cmd = Get-Command jmeter -ErrorAction SilentlyContinue
            if ($cmd) {
                $JMeterBin = $cmd.Source
                break
            }
        } elseif (Test-Path $candidate) {
            $JMeterBin = $candidate
            break
        }
    }
}

if (-not $JMeterBin) {
    Write-Error "JMeter executable not found. Pass -JMeterBin with the full path to jmeter.bat"
    exit 1
}

Write-Host "Running JMeter test..."
Write-Host "JMX     : $JmxFile"
Write-Host "Env     : $EnvFile"
Write-Host "JMeter  : $JMeterBin"
Write-Host "Result  : $resultFile"
Write-Host "Report  : $reportDir"

& $JMeterBin -n -t $JmxFile -q $EnvFile -l $resultFile -e -o $reportDir

if ($LASTEXITCODE -eq 0) {
    Write-Host "JMeter completed successfully."
    Write-Host "Open report: $reportDir\index.html"
} else {
    Write-Error "JMeter failed with exit code $LASTEXITCODE"
    exit $LASTEXITCODE
}
