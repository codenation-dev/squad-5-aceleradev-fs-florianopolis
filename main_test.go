package main

import (
	"testing"

	"github.com/codenation.dev/squad-5-aceleradev-fs-florianopolis/aux"
	"github.com/stretchr/testify/assert"
)

func TestDownload(t *testing.T) {
	err := aux.DownloadSpEmployees()
	assert.Nil(t, err)
}

func TestUnzip(t *testing.T) {
	s, err := aux.Unzip("Remuneracao.zip", "output-folder")
	assert.NotNil(t, s)
	assert.Nil(t, err)

}
