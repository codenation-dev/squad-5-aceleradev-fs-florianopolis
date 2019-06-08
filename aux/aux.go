package aux

import (
	"archive/zip"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"os"
	"path/filepath"
	"strings"
)

//DownloadSpEmployees downloads employess
func DownloadSpEmployees() error {
	fmt.Println("Starting file download")
	response, err := http.PostForm("http://www.transparencia.sp.gov.br/PortalTransparencia-Report/Remuneracao.aspx", url.Values{
		"EVENTTARGET":        {},
		"EVENTARGUMENT":      {},
		"LASTFOCUS":          {},
		"VIEWSTATE":          {"/wEPDwULLTIwNDQzOTAyMzEPZBYCAgMPZBYMAgUPEA8WBh4ORGF0YVZhbHVlRmllbGQFCE9SR0FPX0lEHg1EYXRhVGV4dEZpZWxkBQpPUkdBT19ERVNDHgtfIURhdGFCb3VuZGdkEBVbBVRPRE9THUFETUlOSVNUUkFDQU8gR0VSQUwgRE8gRVNUQURPHUFHLk1FVFIuU09ST0NBQkEtQUdFTVNPUk9DQUJBKEFHRU5DSUEgTUVUUk9QT0xJVEFOQSBCQUlYQURBIFNBTlRJU1RBIEEoQUdFTkNJQSBNRVRST1BPTElUQU5BIERFIENBTVBJTkFTIC0gQUdFTShBR0VOQ0lBIE1FVFJPUE9MSVRBTkEgREUgQ0FNUElOQVMgQUdFTUNBKEFHRU5DSUEgTUVUUk9QT0xJVEFOQSBETyBWQUxFIERPIFBBUkFJQkEoQUdFTkNJQSBSRUdVTEFET1JBIFNBTkVBTUVOVE8gRU5FUkdJQSBFUyhBR0VOQ0lBIFJFR1VMQURPUkEgU0VSVi5QVUJMLkRFTC5UUkFOU1BPJENBSVhBIEJFTkVGSUNFTlRFIERBIFBPTElDSUEgTUlMSVRBUgpDQVNBIENJVklMJkNFTlRSTyBFU1QuREUgRURVQy5URUNOT0wuIFBBVUxBIFNPVVpBJ0NFVEVTQi1DT01QQU5ISUEgQU1CSUVOVEFMIERPIEVTVEFETyBERSNDSUEuIFBST0NFUy4gREFET1MgRVNULlMuUC4tUFJPREVTUCdDSUEuREVTRU5WLkhBQklULkUgVVJCQU5PIEVTVC5TLlAuLUNESFUoQ0lBLlNBTkVBTUVOVE8gQkFTSUNPIEVTVC5TLlBBVUxPLVNBQkVTUChDT01QQU5ISUEgREUgREVTRU5WT0xWSU1FTlRPIEFHUklDT0xBIERFJENPTVBBTkhJQSBERSBTRUdVUk9TIEVTVC5TLlAuLUNPU0VTUCBDT01QQU5ISUEgRE8gTUVUUk9QT0xJVEFOTy1NRVRSTyBDT01QQU5ISUEgRE9DQVMgREUgU0FPIFNFQkFTVElBTyhDT01QQU5ISUEgUEFVTC5UUkVOUyBNRVRST1BPTElUQU5PUy1DUFRNKENPTVBBTkhJQSBQQVVMSVNUQSBERSBPQlJBUyBFIFNFUlZJQ09TIC0lQ09NUEFOSElBIFBBVUxJU1RBIERFIFBBUkNFUklBUyAtIENQUCZDT01QQU5ISUEgUEFVTElTVEEgU0VDVVJJVElaQUNBTy1DUFNFQyZERVBBUlRBTUVOVE8gQUVST1ZJQVJJTyBFU1QuUy5QLi1EQUVTUChERVBBUlRBTUVOVE8gQUdVQVMgRU5FUkdJQSBFTEVUUklDQS1EQUVFJ0RFUEFSVEFNRU5UTyBERSBFU1RSQURBUyBERSBST0RBR0VNLURFUihERVBBUlRBTUVOVE8gRVNUQURVQUwgREUgVFJBTlNJVE8tREVUUkFOKERFUEFSVEFNRU5UTyBFU1RBRFVBTCBUUkFOU0lUTyBERVRSQU4gU1AoREVTRU5WT0xWRSBTUCBBR0VOQ0lBIERFIEZPTUVOVE8gRE8gRVNUQSdERVNFTlZPTFZJTUVOVE8gUk9ET1ZJQVJJTyBTLkEuIC0gREVSU0EoRU1BRS1FTVBSRVNBIE1FVFJPUE9MSVRBTkEgREUgQUdVQVMgRSBFTiZFTVAuTUVUUi5UUkFOU1AuVVJCQU5PUyBTUC5TL0EgRU1UVS1TUChFTVAuUEFVTElTVEEgUExBTkVKLk1FVFJPUExJVEFOTyBTLkEtRU1QIEZBQ1VMREFERSBERSBNRURJQ0lOQSBERSBNQVJJTElBKEZBQ1VMREFERSBNRURJQ0lOQSBTQU8gSk9TRSBETyBSSU8gUFJFVE8oRlVORC5DLkFURU5ELlNPQy1FRC5BRE9MRVNDLUZVTkQuQ0FTQS1TUCdGVU5ELlBFLkFOQ0hJRVRBLUMuUC5SQURJTyBUVi5FRFVDQVRJVkEmRlVOREFDQU8gQU1QQVJPIFBFU1FVSVNBIEVTVCBTQU8gUEFVTE8oRlVOREFDQU8gQ09OU0VSVi5QUk9ELkZMT1JFU1RBTCBFU1QuUy5QLihGVU5EQUNBTyBERVNFTlZPTFZJTUVOVE8gREEgRURVQ0FDQU8tRkRFKEZVTkRBQ0FPIElOU1RJVFVUTyBERSBURVJSQVMgRE8gRVNULlMuUC4jRlVOREFDQU8gTUVNT1JJQUwgREEgQU1FUklDQSBMQVRJTkEgRlVOREFDQU8gT05DT0NFTlRSTyBERSBTQU8gUEFVTE8kRlVOREFDQU8gUEFSQSBPIFJFTUVESU8gUE9QVUxBUi1GVVJQJkZVTkRBQ0FPIFBBUlFVRSBaT09MT0dJQ08gREUgU0FPIFBBVUxPKEZVTkRBQ0FPIFBSRVZJREVOQ0lBIENPTVBMRU1FTlRBUiBFU1RBRE8oRlVOREFDQU8gUFJPLVNBTkdVRS1IRU1PQ0VOVFJPIFNBTyBQQVVMTyhGVU5EQUNBTyBQUk9GLkQuTUFOT0VMIFAuUElNRU5URUwgLUZVTkFQKEZVTkRBQ0FPIFBST1RFQy5ERUZFU0EgQ09OU1VNSURPUi1QUk9DT04oRlVOREFDQU8gU0lTVEVNQSBFU1QuQU5BTElTRSBEQURPUy1TRUFERSdGVU5EQUNBTyBVTklWRVJTSURBREUgVklSVFVBTCBETyBFU1RBRE8WR0FCSU5FVEUgRE8gR09WRVJOQURPUihIT1NQLkNMSU5JQ0FTIEZBQy5NRURJQ0lOQSBSSUIuUFJFVE8tVVNQKEhPU1BJVEFMIENMSU5JQ0FTIEZBQ1VMREFERSBNRURJQ0lOQS1VU1AmSE9TUElUQUwgREFTIENMSU5JQ0FTIEZBQy5NRUQuQk9UVUNBVFUnSU1QUkVOU0EgT0ZJQ0lBTCBETyBFU1RBRE8gUy5BLiAgIElNRVNQJklOU1QgTUVESUNJTkEgU09DIEUgQ1JJTUlOIFMuUC4gLUlNRVNDKElOU1QuUEVTT1MgTUVESURBUyBFU1QuU0FPIFBBVUxPLUlQRU0vU1AmSU5TVC5QRVNRVS5URUNOT0xPR0lDQVMgRVNULlNQLVMvQS1JUFQoSU5TVElUVVRPIEFTU0lTVEVOQ0lBIE1FRElDQSBBTyBTRVJWSURPUihJTlNUSVRVVE8gREUgQVNTSVNURU5DSUEgTUVESUNBIFNFUlZJRE9SKElOU1RJVFVUTyBQQUdBTUVOVE9TIEVTUEVDSUFJUyBTUC0gSVBFU1AoSlVOVEEgQ09NRVJDSUFMIERPIEVTVEFETyBERSBTQU8gUEFVTE8tSiBQT0xJQ0lBIE1JTElUQVIgRVNUQURPIFNBTyBQQVVMTxxQUk9DVVJBRE9SSUEgR0VSQUwgRE8gRVNUQURPHlNBTyBQQVVMTyBQUkVWSURFTkNJQSAtIFNQUFJFViZTRUNSRVRBUklBIEFETUlOSVNUUkFDQU8gUEVOSVRFTkNJQVJJQShTRUNSRVRBUklBIERBIENVTFRVUkEgRSBFQ09OT01JQSBDUklBVElWFlNFQ1JFVEFSSUEgREEgRURVQ0FDQU8kU0VDUkVUQVJJQSBEQSBGQVpFTkRBIEUgUExBTkVKQU1FTlRPF1NFQ1JFVEFSSUEgREEgSEFCSVRBQ0FPE1NFQ1JFVEFSSUEgREEgU0FVREUfU0VDUkVUQVJJQSBEQSBTRUdVUkFOQ0EgUFVCTElDQShTRUNSRVRBUklBIERFIEFHUklDVUxUVVJBIEUgQUJBU1RFQ0lNRU5UJ1NFQ1JFVEFSSUEgREUgREVTRU5WT0xWSU1FTlRPIEVDT05PTUlDTyZTRUNSRVRBUklBIERFIERFU0VOVk9MVklNRU5UTyBSRUdJT05BTCRTRUNSRVRBUklBIERFIERFU0VOVk9MVklNRU5UTyBTT0NJQUwhU0VDUkVUQVJJQSBERSBFTkVSR0lBIEUgTUlORVJBQ0FPFlNFQ1JFVEFSSUEgREUgRVNQT1JURVMVU0VDUkVUQVJJQSBERSBHT1ZFUk5PKFNFQ1JFVEFSSUEgREUgSU5GUkFFU1RSVVRVUkEgRSBNRUlPIEFNQkklU0VDUkVUQVJJQSBERSBMT0dJU1RJQ0EgRSBUUkFOU1BPUlRFUyhTRUNSRVRBUklBIERFIFNBTkVBTUVOVE8gRSBSRUNVUlNPUyBISURSFVNFQ1JFVEFSSUEgREUgVFVSSVNNTyZTRUNSRVRBUklBIEVNUFJFR08gRSBSRUxBQ09FUyBUUkFCQUxITyhTRUNSRVRBUklBIEVTVC5ESVJFSVRPUyBQRVNTT0EgREVGSUNJRU5DHlNFQ1JFVEFSSUEgSlVTVElDQSBFIENJREFEQU5JQSVTRUNSRVRBUklBIFRSQU5TUE9SVEVTIE1FVFJPUE9MSVRBTk9TIFNQLkNMSU4uRkFDLk1FRC5NQVJJTElBLUhDRkFNRU1BKFNVUEVSSU5URU5ERU5DSUEgREUgQ09OVFJPTEUgREUgRU5ERU1JQVMVWwItMQExATIBMwE0ATUBNgE3ATgBOQIxMAIxMQIxMgIxMwIxNAIxNQIxNgIxNwIxOAIxOQIyMAIyMQIyMgIyMwIyNAIyNQIyNgIyNwIyOAIyOQIzMAIzMQIzMgIzMwIzNAIzNQIzNgIzNwIzOAIzOQI0MAI0MQI0MgI0MwI0NAI0NQI0NgI0NwI0OAI0OQI1MAI1MQI1MgI1MwI1NAI1NQI1NgI1NwI1OAI1OQI2MAI2MQI2MgI2MwI2NAI2NQI2NgI2NwI2OAI2OQI3MAI3MQI3MgI3MwI3NAI3NQI3NgI3NwI3OAI3OQI4MAI4MQI4MgI4MwI4NAI4NQI4NgI4NwI4OAI4OQI5MBQrA1tnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnFgFmZAIHDxBkEBUBBVRPRE9TFQECLTEUKwMBZxYBZmQCCQ8QDxYGHwAFC1NJVFVBQ0FPX0lEHwEFDVNJVFVBQ0FPX0RFU0MfAmdkEBUEBVRPRE9TC0FQT1NFTlRBRE9TBkFUSVZPUwxQRU5TSU9OSVNUQVMVBAItMQExATIBMxQrAwRnZ2dnFgFmZAILDw9kFgIeCm9uS2V5UHJlc3MFJ3JldHVybiBNYXNjYXJhTW9lZGEodGhpcywnLicsJywnLGV2ZW50KWQCDQ8PZBYCHwMFJ3JldHVybiBNYXNjYXJhTW9lZGEodGhpcywnLicsJywnLGV2ZW50KWQCFQ9kFgJmD2QWBAIBDxYCHgdWaXNpYmxlaGQCAw8PFgIfBGhkFgICAw88KwARAgEQFgAWABYADBQrAABkGAIFHl9fQ29udHJvbHNSZXF1aXJlUG9zdEJhY2tLZXlfXxYBBQxpbWdFeHBvcnRUeHQFBGdyaWQPZ2QU3O1EpUneDTDR0La3eya+ksNURyHibL/tP+cgqSjJ9Q=="},
		"VIEWSTATEGENERATOR": {"E42B1F40"},
		"EVENTVALIDATION":    {"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"},
		"txtNome":            {},
		"orgao":              {"-1"},
		"cargo":              {"-1"},
		"situacao":           {"-1"},
		"txtDe":              {},
		"txtAte":             {},
		"hdInicio":           {},
		"hdFinal":            {},
		"hdPaginaAtual":      {},
		"hdTotal":            {},
		"imgExportTxt.x":     {"23"},
		"imgExportTxt.y":     {"19"},
	})
	fmt.Println(response, "\n...")
	return err
}

//Unzip unzips a zip file
func Unzip(src string, dest string) ([]string, error) {

	var filenames []string

	r, err := zip.OpenReader(src)
	if err != nil {
		return filenames, err
	}
	defer r.Close()

	for _, f := range r.File {

		// Store filename/path for returning and using later on
		fpath := filepath.Join(dest, f.Name)

		// Check for ZipSlip. More Info: http://bit.ly/2MsjAWE
		if !strings.HasPrefix(fpath, filepath.Clean(dest)+string(os.PathSeparator)) {
			return filenames, fmt.Errorf("%s: illegal file path", fpath)
		}

		filenames = append(filenames, fpath)

		if f.FileInfo().IsDir() {
			// Make Folder
			os.MkdirAll(fpath, os.ModePerm)
			continue
		}

		// Make File
		if err = os.MkdirAll(filepath.Dir(fpath), os.ModePerm); err != nil {
			return filenames, err
		}

		outFile, err := os.OpenFile(fpath, os.O_WRONLY|os.O_CREATE|os.O_TRUNC, f.Mode())
		if err != nil {
			return filenames, err
		}

		rc, err := f.Open()
		if err != nil {
			return filenames, err
		}

		_, err = io.Copy(outFile, rc)

		// Close the file without defer to close before next iteration of loop
		outFile.Close()
		rc.Close()

		if err != nil {
			return filenames, err
		}
	}
	return filenames, nil
}
