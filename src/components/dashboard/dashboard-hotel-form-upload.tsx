import {Group, Text, useMantineTheme, rem, Image, SimpleGrid} from '@mantine/core';
import {Upload, Photo, X} from 'tabler-icons-react';
import {Dropzone, FileWithPath, IMAGE_MIME_TYPE} from '@mantine/dropzone';
import React, {useState} from "react";

interface IProps {
  onUpload: (files: File[]) => void;
  loading: boolean;
}

export const DashboardHotelFormUpload = ({onUpload, loading}: IProps) => {
  const theme = useMantineTheme();
  const [files, setFiles] = useState<FileWithPath[]>([]);

  const onDrop = (files: File[]) => {
    setFiles(files);
    onUpload(files);
  }

  const onReject = (files: any[]) => {
    // TODO: handle rejected files
    console.log('rejected files', files);
  }

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);

    return (
      <Image
        key={index}
        src={imageUrl}
        imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
      />
    );
  });

  return (
    <>
      <Dropzone
        onDrop={(files) => onDrop(files)}
        onReject={(files) => onReject(files)}
        maxSize={3 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        loading={loading}
      >
        <Group position="center" spacing="xl" style={{minHeight: rem(220), pointerEvents: 'none'}}>
          <Dropzone.Accept>
            <Upload
              size="3.2rem"
              color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <X
              size="3.2rem"
              color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <Photo size="3.2rem"/>
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Drag images here or click to select files
            </Text>
            <Text size="sm" color="dimmed" inline mt={7}>
              Attach as many files as you like, each file should not exceed 5mb
            </Text>
          </div>
        </Group>
      </Dropzone>

      <SimpleGrid
        cols={4}
        breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
        mt={previews.length > 0 ? 'xl' : 0}
      >
        {previews}
      </SimpleGrid>
    </>
  );
}