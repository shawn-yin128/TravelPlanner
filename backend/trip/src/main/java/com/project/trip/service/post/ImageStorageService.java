package com.project.trip.service.post;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.project.trip.exception.post.ImageUploadException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@Service
public class ImageStorageService {
    @Value("${aws.s3.bucket}")
    private String bucketName;
    private final AmazonS3 amazonS3Client;

    @Autowired
    public ImageStorageService(AmazonS3 amazonS3Client) {
        this.amazonS3Client = amazonS3Client;
    }

    public String upload(MultipartFile file) {
        String filename = UUID.randomUUID().toString();
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType("image/jpeg");
        try {
            PutObjectRequest request = new PutObjectRequest(bucketName, filename, file.getInputStream(), metadata);
            request.setCannedAcl(CannedAccessControlList.PublicRead);
            amazonS3Client.putObject(request);
            String url = amazonS3Client.getUrl(bucketName, filename).toString();
            System.out.println(url);
            return url;
        } catch (Exception exception) {
            throw new ImageUploadException("Upload fail.");
        }
    }
}
