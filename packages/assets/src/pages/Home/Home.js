import React, {useState} from 'react';
import {DropZone, Layout, Page} from '@shopify/polaris';
import axios from 'axios';

/**
 * Render a home page for overview
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function Home() {
  const [files, setFiles] = useState([]);

  const handleDropZoneDrop = async (_dropFiles, acceptedFiles, _rejectedFiles) => {
    const formData = new FormData();
    const file = acceptedFiles[0];
    console.log(file);
    formData.append('file', file);
    const res = await axios.post('http://127.0.0.1:5000/api/upload', formData);
    console.log(res);
  };

  const fileUpload = !files.length && <DropZone.FileUpload />;
  // const uploadedFiles = files.length > 0 && (
  //   <div style={{padding: '0'}}>
  //     <Stack vertical>
  //       {files.map((file, index) => (
  //         <Stack alignment="center" key={index}>
  //           <Thumbnail
  //             size="small"
  //             alt={file.name}
  //             source={
  //               validImageTypes.includes(file.type) ? window.URL.createObjectURL(file) : NoteMinor
  //             }
  //           />
  //           <div>
  //             {file.name}{' '}
  //             <Text variant="bodySm" as="p">
  //               {file.size} bytes
  //             </Text>
  //           </div>
  //         </Stack>
  //       ))}
  //     </Stack>
  //   </div>
  // );

  return (
    <Page title="Dashboard">
      <Layout>
        <Layout.Section>
          <DropZone onDrop={handleDropZoneDrop}>
            {/*{uploadedFiles}*/}
            {fileUpload}
          </DropZone>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
