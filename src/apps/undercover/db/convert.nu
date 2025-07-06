# You can ask ChatGPT for the csv
def main [dbName: string] {
    open $"($dbName).csv" | each {|w| [ $w.civilians, $w.undercovers ] } | uniq | to json | save -f $"($dbName).json"
}
